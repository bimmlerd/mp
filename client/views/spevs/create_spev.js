Template.createSpev.events({
	'submit form': function(e) {
		e.preventDefault();

		// FIXME security. 

		var form = {
			spevName: $(e.target).find('[name=spevName]').val(),
			spevDate: $(e.target).find('[name=spevDate]').val(),
			spevTime: $(e.target).find('[name=spevTime]').val(),
		}

		var d = new Date(form.spevDate);


		var spev_id = new Meteor.Collection.ObjectID()._str;
		Spevs.insert({
			"name": form.spevName,
			"date": d.toDateString(),
			"time": form.spevTime ,
			"spevId": spev_id
			});

		Router.go('spevsList');
	}


});