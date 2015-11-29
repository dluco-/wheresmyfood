Template.addProduct.helpers({
  products: function() {
    return Products.find();
  }
});

Template.addProduct.onRendered(function() {
  this.$('#bought_date, #best_before_date').datetimepicker({
    format: "D MMMM YYYY"
  });
  this.$('.ui.dropdown').dropdown({
    allowAdditions: true
  });
});

Template.addProduct.rendered = function() {
  $('.ui.add-product').form({
    fields: {
      ean: "empty",
      name: "empty",
      vendor: "empty"
    }
  });
};

var setExistingProductData = function(product) {
  var $form = $(".add-product");
  $form.find("#name").val(product.name);
  $form.find("#vendor").val(product.vendor.name);
  $form.find("#vendor").attr("data-id", product.vendor._id);
  $form.find("#vendor").attr("data-slug", product.vendor.slug);
  $form.find("#description").val(product.description);
  $form.find("#price").val(product.price);
  $form.find("#unit").val(product.unit.id);
  $form.find("#status").val(product.status);
};

Template.addProduct.events({
  "click .selection.dropdown .item.selected": function(e, t) {
    $(".add-product .disabled").removeClass("disabled");

    // If user click existing product
    var id = t.find("#ean .item.selected").getAttribute("data-id");
    if (id !== null) {
      setExistingProductData(Products.findOne({_id: id }));
    }

    // Choice already exist?
    // If true, get and add data to fields.
    // else new item
    //  set namefield to focus
  },

  "change #vendor": function(e, t) {
    var slug = e.target.value.toLowerCase().replace(/ /g, "-");
    var vendor = Vendors.findOne({ slug: slug });
    if (vendor !== undefined) {
      var $form = $(".add-product");
      $form.find("#vendor").attr("data-id", vendor._id);
      $form.find("#vendor").attr("data-slug", vendor.slug);
    }
  },
  "submit .add-product": function(e, t) {
    e.preventDefault();
    var insertProduct = true;

    // Check that all fields that are required is set.
    // If one is not set, yeild error message.
    _.each(t.findAll(".field"), function(element, index) {
      if ($(element).hasClass("required") ) {
        if (( $(element).find(".dropdown.selection").length > 0 && $(element).find(".item.selected").length < 1 )
        || $(element).find("input").val() === ""
        || $(element).find("textarea").val() === ""
        || $(element).find(".dropdown input").val() === "") {
          var text = $(element).find("label").text().trim();
          sAlert.error("Check that " + text + " is set");
          insertProduct = false;
        }
      }
    });

    // Insert in database
    if (insertProduct) {
      var $form = $(".add-product");
      Products.insert({
        ean: $form.find("#ean .item.selected").data("value"),
        name: $form.find("#name").val(),
        description: ($form.find("#description").val() === "") ? "" : $form.find("#description").val(),
        price: ($form.find("#price").val() === "") ? "" : $form.find("#price").val(),
        bought_date: ($form.find("#bought_date").val() === "") ? new Date() : $form.find("#bought_date").val(),
        best_before_date: ($form.find("#best_before_date").val() === "") ? new Date() : $form.find("#best_before_date").val(),
        status: ($form.find("#status").val() === "") ? "draft" : $form.find("#status").val(),
        unit: {
          id: ($form.find("#unit").val() === "") ? 1 : $form.find("#unit").val(),
          slug: ($form.find("#unit :selected").data("slug") === undefined ? "unit-st" : $form.find("#unit :selected").data("slug")),
          name: ($form.find("#unit :selected").val() === "") ? "St" : $form.find("#unit :selected").text()
        },
        vendor: {
          slug: ($form.find("#vendor").data("slug") === undefined ? "no-vendor" : $form.find("#vendor").data("slug")),
          name: ($form.find("#vendor").val() === "") ? "No Vendor" : $form.find("#vendor").val()
        }
      });
      e.target.reset();
      sAlert.success("Product succesfully added");
    }
  }
});
