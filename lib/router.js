Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return Meteor.subscribe('participants'); }
});

Router.route('/', {
	name: "participantsList"
	// name implies -> action: function() {this.render('participantsList')}
});

Router.route('/userEdit', {
	name: "userEdit",
	// data: function() { return Meteor.users.findOne(this.params._id); },
});