Template.participant.helpers({
        displayName: function() {
			return Meteor.users.findOne({_id: this.userId}).displayName;
		},
		weights: function() {
			return Meteor.users.findOne({_id: this.userId}).weights;
		}
});
