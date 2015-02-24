Template.userEdit.events({
	'click :submit': function(e) {
		e.preventDefault();
		var err = false;
		var form = {
			dpName: $(e.target).parents().find('[name=displayName]').val(),
			weights: {
				five: $(e.target).parents().find('[name=five]').val(),
				two: $(e.target).parents().find('[name=two]').val(),
				one: $(e.target).parents().find('[name=one]').val()
			}
		}


		if ($.trim(form.dpName) === "") {
			err = true;
			Router.go('spevsList');
		}

		// FIXME reimplement with check(weight, Number)
		for (var key in form.weights) {
			if (form.weights.hasOwnProperty(key)) {
				if (isNaN(parseInt(form.weights[key])) ||
					form.weights[key] === "") {
					form.weights[key] = undefined;
					err = true;
					Router.go('spevsList');
				}
			}
		}
		if (! err) {
			Meteor.users.update({"_id": Meteor.userId()},
				{$set: {weights: form.weights, displayName: form.dpName}},
				function(error) {
					if (error) {
						throw new Meteor.Error("Error in updating User", error.reason);
					} else {
						Router.go('spevsList');
					}
				});
		}
	}
});
