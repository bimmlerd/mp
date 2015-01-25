Participants = new Mongo.Collection("participants");
Events = new Mongo.Collection("events");

Meteor.methods({
  "join-event": function () {
  	// XXX FIXME EVENTREFACTOR add to event.participants, not just participants
    // Make sure the user is logged in before inserting a participant
    if (Participants.findOne(Meteor.userId())) {
        // already added.
        console.log("You already joined this event.")
        return;
    }
    Participants.insert(Meteor.user());
  },
  "leave-event": function (participantId) {
  	// XXX FIXME EVENTFACTOR remove from event.participants, not just from participants
    if (Meteor.userId() === participantId) {
        Participants.remove(participantId);
    };
  }
});