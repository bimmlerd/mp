Meteor.publish('participants', function() { 
	return Participants.find();
});

Meteor.publish('spevs', function(sort, limit) {
	// options used for pagination
	return Spevs.find({}, {sort: sort, limit: limit});
});

// Meteor.users
Meteor.publish(null, function() {
    return Meteor.users.find({},
							{fields: {'weights': 1,
										'displayName': 1,
										'creator': 1}});
});
