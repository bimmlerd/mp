// XXX FIXME do these belong in server.js?

Meteor.methods({
  "join-spev": function (spev_id) {
    // Make sure the user is logged in before inserting a participant
    if (Participants.findOne({userId: Meteor.userId(), spevId: spev_id})) {
        // already added.
        console.log("You already joined this event.")
        return;
    }
    Participants.insert({userId: Meteor.userId(), spevId: spev_id});
  },
  "leave-spev": function (spev_id) {
    Participants.remove({userId: Meteor.userId(), spevId: spev_id});
  },
});
