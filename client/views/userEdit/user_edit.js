Template.userEdit.events({
	'submit form': function(e) {
		e.preventDefault();

		var form = {
			// XXX FIXME this is easy to break,
			// create an array of valid selections here
			// and then just get an id or something...
			dpName: $(e.target).find('[name=displayName]').val(),
			weights: {
				five: $(e.target).find('[name=five]').val(),
				two: $(e.target).find('[name=two]').val(),
				one: $(e.target).find('[name=one]').val()
			}
		}

		if (form.weights.five == "") {
			form.weights.five = 0;
		}

		if (form.weights.two == "") {
			form.weights.two = 0;
		}

		if (form.weights.one == "") {
			form.weights.one = 0;
		}

		Meteor.users.update({"_id": Meteor.userId()},
			{$set: {weights: form.weights, displayName: form.dpName}},
			function(error) {
			if (error) {
				throw new Meteor.Error("Error in updating User", error.reason);
			} else {
				Router.go('spevsList');
			}
		});
	},
	'click .delete': function(e) {
		e.preventDefault();
		if (confirm("Delete yourself?")) {
			Meteor.call("leave-spev");
			Meteor.users.remove(Meteor.userId()); 
			Router.go('participantsList');
	}
	}
});