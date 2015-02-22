Template.spevsListEntry.events({
    "click .mdi-content-add": function(e,t) {
    e.preventDefault();
    var spev_id = t.data.spevId;
    Meteor.call("join-spev", spev_id);

    // toggle button-state
    document.getElementById("join-leave-btn-" + spev_id).className = 
        document.getElementById("join-leave-btn-" + spev_id).className.replace
        ( /(?:^|\s)add(?!\S)/g , 'clear' );
    },
    "click .mdi-content-clear": function(e, t) {
    e.preventDefault();
    var spev_id = t.data.spevId;
    Meteor.call("leave-spev", spev_id);
    
    // toggle button-state
    document.getElementById("join-leave-btn-" + spev_id).className = 
        document.getElementById("join-leave-btn-" + spev_id).className.replace
        ( /(?:^|\s)clear(?!\S)/g , 'add' );   
    }
});

Template.spevsListEntry.helpers({
    participating: function() {
    	return !!Participants.find({spevId: this.spevId, userId: Meteor.userId()}).count();
	},
    datestring: function() {
        var d = new Date(this.date);
        return d.toDateString();
    }
});
