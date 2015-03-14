Template.participantsList.helpers({
        participants: function() {
			return Participants.find({spev_id: this._id});
    	},
    	empty: function() {
			return !Participants.find({spev_id: this._id}).count();
    	}
});
