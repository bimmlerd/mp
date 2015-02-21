Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { 
		return Meteor.subscribe('participants'); }
});

Router.route('/edit-user', {
	name: "userEdit",
});

Router.route('/create-event', {
	name: "createSpev",
});

Router.route('/:spevsLimit?', {
	// spevsLimit is a optional parameter used for pagination
	name: "spevsList", // name implies -> action: function() {this.render('spevsList')}
});

SpevsListController = RouteController.extend({
	template: 'spevsList',
	increment: 5,
	spevsLimit: function() {
		return parseInt(this.params.spevsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: {date: -1}, limit: this.spevsLimit()};
	},
	subscriptions: function() {
		this.spevSub = Meteor.subscribe('spevs', this.findOptions());
	},
	spevsListEntries: function() {
		return Spevs.find({}, this.findOptions());
	},
	data: function() {
		var hasMore = this.spevsListEntries().count() === this.spevsLimit();
		var nextPath = this.route.path({spevsLimit: this.spevsLimit() + this.increment});
		return {
			spevsListEntries: this.spevsListEntries(),
			ready: this.spevSub.ready,
			nextPath: hasMore ? nextPath : null
		};
	}
});
