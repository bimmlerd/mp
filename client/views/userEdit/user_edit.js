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

		for (var key in form.weights) {
			if (form.weights.hasOwnProperty(key)) {
				console.log(key + " -> " + form.weights[key]);
				if (isNaN(parseInt(form.weights[key])) ||
					form.weights[key] === "") {
					form.weights[key] = 0;
					Router.go('spevsList');
				}
			}
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