crypto = Npm.require('crypto')

var Api = new Restivus({
    useDefaultAuth: false,
    prettyJson: true
  });

function checkAPIKey(key) {
  if (API_Users.findOne({"key": key})) {
        return true;
      }
  return false;
}

Api.addRoute('events/', {
    get: function () {
      //var spev = Spevs.findOne(this.urlParams.id);
      var spev = Spevs.find({'date': {$gt: new Date().valueOf()}}).fetch();
      return {"status": 'success', "data": spev};
    }
  });

Api.addRoute('integration/telegram', {
    get: function () {
      if (!checkAPIKey(this.queryParams.key)) {
        return {
          statusCode: 401,
          body: {"status": 'fail', "message": 'Not authorized. So sorry.'}
        };
      }
      var token = new Buffer(crypto.randomBytes(32)).toString('base64');
      AccountLinkTokens.insert({"token": token, "telegram_id": this.queryParams.telegram_id});
      return {"status": 'success', "data": {"token": encodeURIComponent(token)}};
    }
  });

Api.addRoute('join/:eventID', {
    post: function () {
      if (!checkAPIKey(this.bodyParams.key)) {
        return {
          statusCode: 401,
          body: {"status": "fail", "message": "Not authorized. So sorry."}
        };
      }
      user = Meteor.users.findOne({"telegram_id": parseInt(this.bodyParams.telegram_id)})
      if (!user) {
        return {
          statusCode: 412,
          body: {"status": "fail", "data": {"message": "Please register first!"}}
        };
      }
      if (Participants.findOne({user_id: user._id, spev_id: this.urlParams.eventID})) {
        return {
          statusCode: 208,
          body: {"status": "success", "data": {"message": "Already in the event."}}
        };
      }
      Participants.insert({user_id: user._id, weights: user.weights, spev_id: this.urlParams.eventID});
      return {"status": "success"}
    }
  });

Api.addRoute('leave/:eventID', {
    post: function () {
      if (!checkAPIKey(this.bodyParams.key)) {
        return {
          statusCode: 401,
          body: {"status": "fail", "message": "Not authorized. So sorry."}
        };
      }
      user = Meteor.users.findOne({"telegram_id": parseInt(this.bodyParams.telegram_id)})
      if (!user) {
        return {
          statusCode: 412,
          body: {"status": "fail", "data": {"message": "Please register first!"}}
        };
      }
      if (!Participants.findOne({user_id: user._id, spev_id: this.urlParams.eventID})) {
        return {
          statusCode: 208,
          body: {"status": "success", "data": {"message": "Not in the event."}}
        };
      }
      Participants.remove({user_id: user._id, weights: user.weights, spev_id: this.urlParams.eventID});
      return {"status": "success"}
    }
  });