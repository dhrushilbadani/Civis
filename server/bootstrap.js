// run this when the meteor app is started
Meteor.startup(function() {

  // if there are no polls available create sample data
  if (Polls.find().count() === 0) {

    // create sample polls
    var samplePolls = [
      {
        question: 'Is #DigitalIndia worth the hype?',
        choices: [
          { text: 'Of course!', votes: 21 },
          { text: 'Eh', votes: 9 },
          { text: 'No. Fail!', votes: 5 }
        ]
      },
      {
        question: 'Should Somnath Bharti be expelled from the AAP?',
        choices: [
          { text: 'Yes, surely', votes: 15 },
          { text: 'Wait for the court verdict', votes: 12 },
          { text: 'No', votes: 2 }
        ]
      }
    ];

    // loop over each sample poll and insert into database
    _.each(samplePolls, function(poll) {
      Polls.insert(poll);
    });

  }

});