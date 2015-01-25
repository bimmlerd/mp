Template.userEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var form = {
			dpName: $(e.target).find('[name=displayName]').val(),
			weights: {
				five: $(e.target).find('[name=five]').val(),
				two: $(e.target).find('[name=two]').val(),
				one: $(e.target).find('[name=one]').val()
			}
		}

		Meteor.users.update({"_id": Meteor.userId()}, {$set: {weights: form.weights, displayName: form.dpName}}, function(error) {
			if (error) {
				// display the error to the user
				throw new Meteor.Error("Error in updating User", error.reason);
			} else {
				if (Participants.findOne(Meteor.userId())) {
					Meteor.call("leave-event", Meteor.userId());
					Meteor.call("join-event");	
				}
				Router.go('participantsList');
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete yourself?")) {
			Meteor.call("leave-event");
			Meteor.users.remove(Meteor.userId()); 
			Router.go('participantsList');
	}
	}
});