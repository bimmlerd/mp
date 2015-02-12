Template.spev.events({
    "click .join-spev": function(e,t) {
    e.preventDefault();
    var spev_id = t.data.spevId;
    Meteor.call("join-spev", spev_id);

    // toggle button-state
    document.getElementById("join-leave-btn-" + spev_id).className = 
        document.getElementById("join-leave-btn-" + spev_id).className.replace
        ( /(?:^|\s)join-spev(?!\S)/g , ' leave-spev' );
    },
    "click .leave-spev": function(e, t) {
    e.preventDefault();
    var spev_id = t.data.spevId;
    Meteor.call("leave-spev", spev_id);
    
    // toggle button-state
    document.getElementById("join-leave-btn-" + spev_id).className = 
        document.getElementById("join-leave-btn-" + spev_id).className.replace
        ( /(?:^|\s)leave-spev(?!\S)/g , ' join-spev' );   
    }
});

Template.spev.helpers({
    participating: function() {
    	return !!Participants.find({spevId: this.spevId, userId: Meteor.userId()}).count();
	},
    datestring: function() {
        var d = new Date(this.date);
        return d.toDateString();
    }
});
