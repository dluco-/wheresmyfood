Template.addProduct.helpers({
  products: function() {
    return Products.find();
  }
});

Template.addProduct.onRendered(function() {
  this.$('.datetimepicker').datetimepicker({
    format: "D MMMM YYYY"
  });
  this.$('.ui.dropdown').dropdown({
    allowAdditions: true
  });
});

Template.addProduct.rendered = function() {
  $('.ui.add-product').form({
    fields: {
      name: "empty",
      vendor_name: "empty",
      vendor_slug: "empty"
    }
  });
};

Template.addProduct.events({
  "submit .add-product": function(e, t) {
    e.preventDefault();

    var name = t.find("#name").value;
    var vendor_name = t.find("#vendor_name").value;
    var vendor_slug = t.find("#vendor_slug").value;

    // Insert in database
    Products.insert({
      name: name,
      vendor: {
        id: 1,
        slug: vendor_slug,
        name: vendor_name
      }
    });
    e.target.reset();
    sAlert.success("Product succesfully added");
  }
});
