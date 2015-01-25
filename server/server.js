Accounts.onCreateUser(function(options, user) {
	// TODO maybe add joined events to user record?
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
    	return doc._id === userId;
	},
	remove: function (userId, doc) {
		return doc._id === userId;
	}
});

Meteor.users.deny({
	update: function(userId, doc, fields, modifier) {
		var no = _.contains(fields, 'username') ||
				_.contains(fields, 'emails');
		return no;
	}
})