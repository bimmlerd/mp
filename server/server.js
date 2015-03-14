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
	update: function(user_id, doc, fields, modifier) {
		// can only change your own documents
		// TODO apparently doc only contains _id if it was changed, so
		// that should also be blocked. unsure about this.
		return doc._id === user_id;
	},
	remove: function(user_id, doc) {
		return doc._id === user_id;
	}
});

Meteor.users.deny({
	update: function(user_id, doc, fields, modifier) {
				// TODO apparently doc only contains _id if it was changed, so
				// that should also be blocked.
		var no =  _.contains(fields, 'username')  ||
							_.contains(fields, 'emails')    ||
							_.contains(fields, 'creator');
		return no;
	}
})

Spevs.allow({
		insert: function(user_id, doc) {
			// XXX FIXME SPEVSREFACTOR actual security measures
			// how about only registered ones
			return true;
		}
})

Accounts.config({
	sendVerificationEmail: true
});

Meteor.methods({
	"join-spev": function(spev_id) {
		// Make sure the user is logged in before inserting a participant
		if (Participants.findOne({user_id: Meteor.userId(), spev_id: spev_id})) {
				// already added.
			console.log("You already joined this event.")
			return;
		}
		Participants.insert({user_id: Meteor.userId(), spev_id: spev_id});
	},
	"leave-spev": function(spev_id) {
		Participants.remove({user_id: Meteor.userId(), spev_id: spev_id});
	}
});
