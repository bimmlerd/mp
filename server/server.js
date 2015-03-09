Accounts.onCreateUser(function(options, user) {
	// TODO maybe add joined spevs to user record?
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
    	user.profile = options.profile;
    user.creator = false;
    user.displayName = options.username;
    user.weights = {
    	// some default values..
        one: "2",
        two: "4",
        five: "0"
    };
    return user;

});

Meteor.users.allow({
	update: function(userId, doc, fields, modifier) {
    	// can only change your own documents
        // TODO apparently doc only contains _id if it was changed, so
        // that should also be blocked. unsure about this.
    	return doc._id === userId;
	},
	remove: function(userId, doc) {
		return doc._id === userId;
	}
});

Meteor.users.deny({
	update: function(userId, doc, fields, modifier) {
        // TODO apparently doc only contains _id if it was changed, so
        // that should also be blocked.
		var no = _.contains(fields, 'username') ||
				_.contains(fields, 'emails') ||
                _.contains(fields, 'creator');
		return no;
	}
})

Spevs.allow({
    insert: function(userId, doc) {
        // XXX FIXME SPEVSREFACTOR actual security measures
        return true;
    }
})

Meteor.methods({
  "join-spev": function(spev_id) {
    // Make sure the user is logged in before inserting a participant
    if (Participants.findOne({userId: Meteor.userId(), spevId: spev_id})) {
        // already added.
        console.log("You already joined this event.")
        return;
    }
    Participants.insert({userId: Meteor.userId(), spevId: spev_id});
  },
  "leave-spev": function(spev_id) {
    Participants.remove({userId: Meteor.userId(), spevId: spev_id});
  },
  "create-spev": function(name) {
    // not everybody should be able to create events
    // pretty sure this is broken though
    // XXX FIXME
    if (!Meteor.user().creator) { return };

    var d = new Date();
    var spev_id = new Meteor.Collection.ObjectID()._str;
    var spev_name = name || "Test Event"
    Spevs.insert({
      "name": spev_name,
      "date": d.valueOf(),
      "time": "8.00" ,
      "spevId": spev_id
      });
  }
});
