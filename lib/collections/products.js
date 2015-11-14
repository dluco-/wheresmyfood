Products = new Mongo.Collection("products");

Products.featured = function() {
  var featuredSkus = ["4088", "3050", "1593"];
  return Products.find({sku : {$in : featuredSkus}});
};

Products.allow({
  insert: function(userId, product){
    return isAdmin();
  },
  update: function(userId, product){
    return isAdmin();
  },
  remove: function(userId, product){
    return isAdmin();
  }
});
