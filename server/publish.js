Meteor.publish('participants', function() { 
	return Participants.find();
});

Meteor.publish('spevs', function(options) {
	return Spevs.find({}, options);
});

//Meteor.users
Meteor.publish(null, function() {
    return Meteor.users.find({}, {fields: {'weights': 1, 'displayName': 1}});
});
// More fields for yourself
Meteor.publish(null, function() {
    return Meteor.users.find({"_id": this.userId},
							{fields: {'creator': 1, 'telegram_id': 1}});
});

Meteor.publish("part_count_per_spev", function () {
    var sub = this;
    var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;

    // aggregation pipeline; count participants for distinct spevs
    var pipeline = [{$group: {_id: "$spev_id", count: {$sum: 1}}}];

    db.collection("participants").aggregate(
        pipeline,
        // Need to wrap the callback so it gets called in a Fiber.
        Meteor.bindEnvironment(
            function(err, result) {
                // Add each of the results to the subscription.
                _.each(result, function(e) {
                    // Generate a random disposable id for aggregated documents
                    sub.added("participant_counts", Random.id(), {
                        spev_id: e._id,
                        participant_count: e.count
                    });
                });
                sub.ready();
            },
            function(error) {
                Meteor._debug( "Error doing aggregation: " + error);
            }
        )
    );
});
