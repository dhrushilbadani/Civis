var cheerio = Meteor.npmRequire('cheerio');
SyncedCron.add({
  name: 'Daily Scraper',
  schedule: function(parser) {
    return parser.text('every 2 mins'); // parser is a later.parse object.
  },
  job: function() {
    var result = Meteor.http.get('http://www.ndtv.com/polls');
    var $ = cheerio.load(result.content);
        // var open = $('div.permalink-inner.permalink-tweet-container > div > div > p').text();
        var que = $('body > div.newcont > div > div > div.ins_wid990 > div.ins_lftcont640.clr > div.ins_left_rhs > div > div.new_polllisting > ul > li:nth-child(1) > div.npoll_header > a').attr('title');
        console.log("Hi");
        console.log(que);
        console.log(result);
        console.log($);
        var scraped = [
        {
        question: que,
        channel: 'NDTV',
        totalvotes: 30,
        choices: [
          { text: 'Yes', votes: 10 },
          { text: 'No', votes: 10},
          { text: 'Cannot Say', votes: 10}
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
