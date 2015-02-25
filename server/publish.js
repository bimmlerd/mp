Meteor.publish('participants', function() { 
	return Participants.find();
});

Meteor.publish('spevs', function(options) {
	return Spevs.find({}, options);
});

// Meteor.users
Meteor.publish(null, function() {
    return Meteor.users.find({},
							{fields: {'weights': 1,
										'displayName': 1,
										'creator': 1}});
});
