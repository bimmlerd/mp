Template.spevsList.helpers({
        spevs: function () {
        	// show next spev first
        	//return Spevs.find({}, {sort: {date: 1}});
        	return Spevs.find();
    	},
});