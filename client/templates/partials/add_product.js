Template.addProduct.helpers({
  products: function() {
    return Products.find();
  }
});

Template.addProduct.onRendered(function() {
  this.$('#bought_date').datetimepicker({
    format: "D MMMM YYYY"
  });
  this.$('#best_before_date').datetimepicker({
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
  "click .selection.dropdown .item.selected": function(e, t) {
    $(".add-product .disabled").removeClass("disabled");
  },
  "submit .add-product": function(e, t) {
    e.preventDefault();

    var name = t.find(".selection.dropdown .item.selected .text").getAttribute("data-name");
    var ean = t.find(".selection.dropdown .item.selected .description").getAttribute("data-ean");
    var vendor_name = t.find("#vendor_name").value;
    var vendor_slug = t.find("#vendor_slug").value;
    var best_before_date = $('#best_before_date').data("DateTimePicker").date();

    // Insert in database
    Products.insert({
      name: name,
      ean: ean,
      // best_before_date: best_before_date._d,
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
