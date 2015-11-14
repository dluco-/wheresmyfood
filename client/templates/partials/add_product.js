
Template.addProduct.helpers({
  products: function() {
    return Products.find();
  }
});

Template.addProduct.onRendered(function () {
  this.$('.ui.dropdown').dropdown({
    allowAdditions: true
  });
});

Template.addProduct.events({
  "submit .add-product": function(event, template) {
    event.preventDefault();

    // Insert in database

    var data = event.target;
    console.log(data);
    var fail = false;

    // Check that all fields are set.
    _.some(data, function(element) {
      if (element.value === "" && element.hasAttribute("placeholder")) {
        sAlert.error("Check that " + element.placeholder + " are set.");
        fail = true;
      }
    });

    if (!fail) {
      Products.insert({
        sku: data[0].value,
        name: data[1].value,
        vendor: {
          id: 1,
          slug: data[0].value,
          name: ""
        }
      });
      event.target.reset();
      sAlert.success("Product " + data[1].value + " succesfully added");
    }
  }
});
