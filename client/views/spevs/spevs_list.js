Template.spevsList.helpers({
        spevs: function () {
			// show most in the future spev first
			return Spevs.find({}, {sort: {date: -1}});
    	},
});