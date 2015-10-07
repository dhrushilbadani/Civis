Polls = new Mongo.Collection('polls');
ScrapedPolls = new Mongo.Collection('scrapedpolls');
Polls.initEasySearch('question');