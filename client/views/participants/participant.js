Template.participant.helpers({
        displayName: function() {
        	return Meteor.users.findOne({_id: this.userId}).displayName;
    	},
    	weightString: function() {
    		var w = Meteor.users.findOne({_id: this.userId}).weights;
    		return w.five + " 5er, " + w.two + " 2er and " + w.one + " 1er"
    	}
});
