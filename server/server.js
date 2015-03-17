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
		// can only change your own user
		return doc._id === user_id;
	}
});

Meteor.users.deny({
	update: function(user_id, doc, fields, modifier) {
		var no =  _.contains(fields, 'username') ||
					_.contains(fields, 'emails') ||
					_.contains(fields, 'creator');
		return no;
	}
})

Spevs.allow({
		insert: function(user_id, doc) {
			return Meteor.users.findOne({_id: user_id}) &&
				Meteor.users.findOne({_id: user_id}).creator;
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
	},
	"edit-user": function(form) {
		// valid weights "type" for check
		ValidWeight = Match.Where(function (x) {
			check(x, Number);
			return x >= 0 && x <= 4;
		});
		try {
			if (form.dpName.trim() === "") {
				throw new Meteor.Error("Invalid Data", "Can't have an empty name.");
			}

			for (var key in form.weights) {
				if (form.weights.hasOwnProperty(key)) {
					check(parseInt(form.weights[key]), ValidWeight);
				}
			}

			Meteor.users.update({"_id": Meteor.userId()},
				{$set: {weights: form.weights, displayName: form.dpName}},
				function(error) {
					if (error)
						throw new Meteor.Error("Error in updating User", error.reason);
				}
			);
		} catch(e) {
			return;
		}
	}
});
