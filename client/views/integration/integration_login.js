Template.integrationLogin.events({
	"click #integration": function(e, t) {
		e.preventDefault();
		var success = Meteor.call("perform-integration", t.data.token);
		ga('send', 'event', 'Integration', 'Telegram ID linked to Account');
		Router.go("/");
	}
});

Template.integrationLogin.helpers({
    has_telegram: function() {
    	return Meteor.userId() && Meteor.user().telegram_id;
    }
});
