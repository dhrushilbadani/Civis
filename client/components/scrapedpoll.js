// attach events to our poll template
Template.scrapedpoll.events({

  // event to handle clicking a choice
  'click .vote': function(event) {

    // prevent the default behavior
    event.preventDefault();

    // get the parent (poll) id
    var pollID = $(event.currentTarget).parent('.scrapedpoll').data('id');
    var voteID = $(event.currentTarget).data('id');

    if(localStorage['votedForPost' + pollID] == 'true') {
      return;
    }

    // create the incrementing object so we can add to the corresponding vote
    var voteString = 'choices.' + voteID + '.votes';
    var action = {};
    action[voteString] = 1;
    action['totalvotes'] = 1;

    // increment the number of votes for this choice
    ScrapedPolls.update(
      { _id: pollID },
      { $inc: action }
    );
    console.log("Clicked "+$(event.currentTarget).parent());
    $(event.currentTarget).parent().fadeTo('slow', 0.65);
    /*if ($(event.currentTarget).hasClass("hvr-grow")) {
        $(event.currentTarget).toggleClass("hvr-grow");
    }*/
    $('.scrapedpolls').find('[data-id='+pollID+']').fadeTo('slow', 0.65);
    $(event.currentTarget).parent().prop('disabled', true);
    $(event.currentTarget).siblings('.vote').removeClass("hvr-grow");
    localStorage['votedForPost' + pollID] = 'true';
  }

});

Template.scrapedpoll.rendered = function () {
    // create the chart
    var currid = Template.currentData()._id;
    console.log("Rendering ", currid);
    var choicesArr = Template.currentData().choices;
    var max0 = false, max1 = false, max2 = false;
    var choice0 = choicesArr[0];
    var name0 = choice0.text;
    var votes0 = choice0.votes;
    var choice1 = choicesArr[1];
    var name1 = choice1.text;
    var votes1 = choice1.votes;
    var choice2 = choicesArr[2];
    var name2 = choice2.text;
    var votes2 = choice2.votes;
    if (Math.max(votes0, votes1, votes2) == votes0) {
        max0 = true;
    } else if (Math.max(votes0, votes1, votes2) == votes1) {
        max1 = true;
    } else {
        max2 = true;
    }
    if (votes0 != 0 || votes1 != 0 || votes2 != 0) {
        $('.scrapedhighcontainer'+Template.currentData()._id).each(function(i,e) {
            console.log("Graphing ", currid);
            $(e).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                marginTop:2,
                marginBottom: 0,
                marginLeft: 50,
                marginRight: 50,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: null
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    size:'100%',
                    slicedOffset: 10,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        distance: 0,
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: "% Votes",
                colorByPoint: true,
                data: [{
                    name: name0,
                    y: votes0,
                    sliced: max0,
                }, {
                    name: name1,
                    y: votes1,
                    sliced: max1
                }, {
                    name: name2,
                    y: votes2,
                    sliced: max2
                }]
            }]
        });
    });
}

    if(localStorage['votedForPost' + currid] == 'true') {
        $('.scrapedpolls').find('[data-id='+currid+']').fadeTo('fast', 0.65);
    }
};

