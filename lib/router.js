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

// only creators
Router.onBeforeAction(function () {
	if (!Meteor.userId()) {
		this.render('loading');
	} else if (!Meteor.user().creator) {
		this.render('loading');
	} else {
	    // otherwise don't hold up the rest of hooks or our route/action function
	    // from running
	    this.next();
	}
}, {only: ['createSpev']});

// only users
Router.onBeforeAction(function () {
	if (!Meteor.userId()) {
		this.render('loading');
	} else {
	    this.next();
	}
}, {only: ['userEdit']});


Router.route('/stats', {
	name: "statsPage",
	subscriptions: function() {
		return [Meteor.subscribe('part_count_per_spev'), Meteor.subscribe('spevs', {})];
	}
})

Router.route('/user', {
	name: "userPage"
})

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
