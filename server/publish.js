Meteor.publish('participants', function() { 
	return Participants.find();
});

Meteor.publish('spevs', function() {
	// XXX FIXME SPEVREFACTOR sort; next event at the top
	return Spevs.find();
});

// Meteor.users
Meteor.publish(null, function () {
    return Meteor.users.find({},
                             {fields: {'weights': 1, 'displayName': 1}});
});
