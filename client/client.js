Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

ParticipantCounts = new Mongo.Collection("participant_counts", {idGeneration: 'STRING'});