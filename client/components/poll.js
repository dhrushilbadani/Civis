// attach events to our poll template
Template.poll.events({

  // event to handle clicking a choice
  'click .vote': function(event) {

    // prevent the default behavior
    event.preventDefault();

    // get the parent (poll) id
    var pollID = $(event.currentTarget).parent('.poll').data('id');
    var voteID = $(event.currentTarget).data('id');

    if(localStorage['votedForPost' + pollID] == 'true') {
      return;
    }

    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;

    // increment the number of votes for this choice
    Polls.update(
      { _id: pollID },
      { $inc: action }
    );

    $(event.currentTarget).parent().fadeTo('slow', 0.5);
    Session.set()
    localStorage['votedForPost' + pollID] = 'true';
  }

});

Template.poll.rendered = function () {
    // create the chart
    var currid = Template.currentData()._id;
    $('.highcontainer'+Template.currentData()._id).highcharts({
        chart: {
            events: {
                click: function(event) {
                    alert ('x: '+ event.xAxis[0].value +', y: '+
                          event.yAxis[0].value);
                }
            }
        },
        xAxis: {
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });
    if(localStorage['votedForPost' + currid] == 'true') {
        $('.polls').find('[data-id='+currid+']').fadeTo('fast', 0.65);
    }
};

