Template.participantsList.helpers({
        participants: function () {
        	// Show newest participants first
        	return Participants.find({}, {sort: {displayName: 1}});
    	},
    	// XXX FIXME EVENTREFACTOR where does this need to be?
    	participating: function() {
    		return !! Participants.findOne(Meteor.userId())
    	}


});
