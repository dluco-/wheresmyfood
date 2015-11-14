Template.homeIndex.helpers({
  products: function() {
    return Products.find({}, {sort: {bought_date: -1}});
  }
});
