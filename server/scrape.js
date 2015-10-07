var cheerio = Meteor.npmRequire('cheerio');
SyncedCron.add({
  name: 'Daily Scraper',
  schedule: function(parser) {
    return parser.text('every 2 mins'); // parser is a later.parse object.
  },
  job: function() {
    console.log("Beginning scraping....");
    var result = Meteor.http.get('http://www.ndtv.com/polls');
    console.log(result);
    var $ = cheerio.load(result.content);
    // var open = $('div.permalink-inner.permalink-tweet-container > div > div > p').text();
    var que1 = $('body > div.newcont > div > div > div.ins_wid990 > div.ins_lftcont640.clr > div.ins_left_rhs > div > div.new_polllisting > ul > li:nth-child(1) > div.npoll_header > a').attr('title');
    console.log(que1);

    result = Meteor.http.get('http://timesofindia.indiatimes.com/home/polls');
    console.log(result);
    $ = cheerio.load(result.content);
    var que2 = $('#pollform > div > div.polltxt1 > div > font > b').text();
    console.log(que2);

    result = Meteor.http.get('http://www.abplive.in/Polls');
    console.log(result);
    $ = cheerio.load(result.content);
    console.log($);
    var que3 = $('#activePollForm > div.pollQuestion > h3').text();
    console.log(que3);

    var scraped = [
      {
        question: que1,
        channel: 'NDTV',
        totalvotes: 30,
        choices: [
          { text: 'Yes', votes: 10 },
          { text: 'No', votes: 10},
          { text: 'Cannot Say', votes: 10}
        ]
      },
      {
        question: que2,
        channel: 'TOI',
        totalvotes: 20,
        choices: [
          { text: 'Yes', votes: 6},
          { text: 'No', votes: 6},
          { text: 'Cannot Say', votes: 8}
        ]
      },
      {
        question: que3,
        channel: 'ABP Live',
        totalvotes: 21,
        choices: [
          { text: 'Yes', votes: 6},
          { text: 'No', votes: 6},
          { text: 'Cannot Say', votes: 8}
        ]
      }
    ];



      _.each(scraped, function(p) {
        if (ScrapedPolls.find({ question: p.question }).count() == 0) {
          ScrapedPolls.insert(p);
        }
      }
    );
  }
});
SyncedCron.start();
