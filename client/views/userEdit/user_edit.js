Template.userEdit.events({
	'click :submit': function(e) {
		e.preventDefault();
		var form = {
			dpName: $(e.target).parents().find('[name=displayName]').val(),
			weights: {
				five: $(e.target).parents().find('[name=five]').val(),
				two: $(e.target).parents().find('[name=two]').val(),
				one: $(e.target).parents().find('[name=one]').val()
			}
		}
		Meteor.call("edit-user", form);
		Router.go('spevsList');
	}
});
