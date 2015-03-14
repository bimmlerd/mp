Template.spevsListEntry.events({
    "click .mdi-content-add": function(e,t) {
    e.preventDefault();
    Meteor.call("join-spev", t.data._id);
    },

    "click .mdi-content-clear": function(e, t) {
    e.preventDefault();
    Meteor.call("leave-spev", t.data._id);
    }
});

Template.spevsListEntry.helpers({
    participating: function() {
        return !!Participants.find({spev_id: this._id, user_id: Meteor.userId()}).count();
	},
    datestring: function() {
        var d = new Date(this.date);
        return d.toDateString();
    }
});
