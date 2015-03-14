Template.participant.helpers({
        displayName: function() {
			return Meteor.users.findOne({_id: this.user_id}).displayName;
		},
		weights: function() {
			return Meteor.users.findOne({_id: this.user_id}).weights;
		}
});
