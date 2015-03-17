Template.userEdit.events({
	'click :submit': function(e) {
		e.preventDefault();
		// valid weights "type" for check
		ValidWeight = Match.Where(function (x) {
		  check(x, Number);
		  return x >= 0 && x <= 4;
		});

		try {
			var form = {
				dpName: $(e.target).parents().find('[name=displayName]').val(),
				weights: {
					five: $(e.target).parents().find('[name=five]').val(),
					two: $(e.target).parents().find('[name=two]').val(),
					one: $(e.target).parents().find('[name=one]').val()
				}
			}

			if ($.trim(form.dpName) === "") {
				throw new Meteor.Error("Invalid Data", "Can't have an empty name.");
				Router.go('spevsList');
			}


			for (var key in form.weights) {
				if (form.weights.hasOwnProperty(key)) {
					check(parseInt(form.weights[key]), ValidWeight);
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
				}
			);

		} catch(e) {
			Router.go('spevsList');
		}
	}
});
