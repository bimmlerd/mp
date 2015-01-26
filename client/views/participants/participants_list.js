Template.participantsList.helpers({
        participants: function () {
			return Participants.find({spevId: this.spevId});
    	}
});
