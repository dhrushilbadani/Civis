Template.body.helpers({

  polls: function() {
    return Polls.find().fetch().reverse();
  },

  pbyvotes: function() {
    return Polls.find({}, {sort: {totalvotes: -1}});
  },

  scrapedpolls: function() {
    return ScrapedPolls.find().fetch().reverse();
  }
});

// adds index to each item
UI.registerHelper('indexedArray', function(context, options) {
  if (context) {
    return context.map(function(item, index) {
      item._index = index;
      return item;
    });
  }
});

