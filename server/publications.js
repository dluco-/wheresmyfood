Meteor.publish("all-products", function(){
  return Products.find();
});

Meteor.publish("featured-products", function(){
  return Products.featured();
});

Meteor.publish("vendors", function(){
  return Vendors.find();
});

Meteor.publish("products-by-vendor", function(slug){
  return Products.find({"vendor.slug" : slug});
});

Meteor.publish("products-by-id", function(id){
  return Products.find({"_id": id});
});
