Accounts.onCreateUser(function(options, user) {
	// TODO maybe add joined spevs to user record?
    // We still want the default hook's 'profile' behavior.
    if (options.profile)
    	user.profile = options.profile;

    user.displayName = options.username;
    user.weights = {
    	// some default values..
        one: 2,
        two: 4,
        five: 0
    };
    return user;

});

Meteor.users.allow({
	update: function (userId, doc, fields, modifier) {
    	// can only change your own documents
        // TODO apparently doc only contains _id if it was changed, so
        // that should also be blocked.
    	return doc._id === userId;
	},
	remove: function (userId, doc) {
		return doc._id === userId;
	}
});

Meteor.users.deny({
	update: function(userId, doc, fields, modifier) {
        // TODO apparently doc only contains _id if it was changed, so
        // that should also be blocked.
		var no = _.contains(fields, 'username') ||
				_.contains(fields, 'emails');
		return no;
	}
})

Spevs.allow({
    insert: function(userId, doc) {
        // XXX FIXME SPEVSREFACTOR actual security measures
        return true;
    }
})
