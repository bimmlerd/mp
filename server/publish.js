Meteor.publish('participants', function() { 
	return Participants.find();
});

Meteor.publish('events'), function() {
	// XXX FIXME EVENTREFACTOR sort; next event at the top
	return Events.find();
}

// Meteor.users
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'weights': 1, 'displayName': 1}});
  } else {
    this.ready();
  }
});

