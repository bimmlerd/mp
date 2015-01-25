Template.layout.events({
    "click .join-event": function(e) {
        e.preventDefault();
        Meteor.call("join-event");

        // rotate button
        document.getElementById("join-leave-btn").className = 
            document.getElementById("join-leave-btn").className.replace
            ( /(?:^|\s)join-event(?!\S)/g , ' leave-event' );
    },
    "click .leave-event": function (e) {
        e.preventDefault();
        Meteor.call("leave-event", Meteor.userId());

        // rotate button
        document.getElementById("join-leave-btn").className = 
            document.getElementById("join-leave-btn").className.replace
            ( /(?:^|\s)leave-event(?!\S)/g , ' join-event' );   
    }
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});