Template.createSpev.events({
	'submit form': function(e) {
		// FIXME put all of this is a meteor.method
		// FIXME SECURITY user input sanitisation lacking (setHours called etc)
		e.preventDefault();
		if (!Meteor.user().creator) {return;}

		var form = {
			spevName: $(e.target).find('[name=spevName]').val(),
			spevDate: $(e.target).find('[name=spevDate]').val(),
			spevTime: $(e.target).find('[name=spevTime]').val(),
		}

		var d = new Date(form.spevDate);
		d.setHours(form.spevTime.substr(0,2), form.spevTime.substr(3))

		var id = Spevs.insert({
			"name": form.spevName,
			"date": d.valueOf(),
			"time": form.spevTime
		});
		Router.go('spevsList');
	}
});

Template.createSpev.rendered = function() {
	$('.datepicker').pickadate();
}
