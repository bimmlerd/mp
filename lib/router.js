Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return Meteor.subscribe('participants'); }
});

Router.route('/', {
	name: "spevsList", // name implies -> action: function() {this.render('spevsList')}
	waitOn: function () {
		return Meteor.subscribe('spevs');
    },
});

Router.route('/edit-user', {
	name: "userEdit",
});
