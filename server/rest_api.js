var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: false
  });

Api.addRoute('events/', {authRequired: false}, {
    get: function () {
      //var spev = Spevs.findOne(this.urlParams.id);
      var spev = Spevs.find().fetch();
      if (spev) {
        return {status: 'success', data: spev};
      }
      return {
        statusCode: 404,
        body: {status: 'fail', message: 'Event not found'}
      };
    }
  });