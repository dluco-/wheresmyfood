Router.configure({
  layoutTemplate: "layout",
  yieldTemplates: {
    nav: {
      to: 'nav'
    },
    footer: {
      to: 'footer'
    },
  },
  notFoundTemplate: "notFound",
  loadingTemplate: "loading",
  waitOn: function() {
    return Meteor.subscribe("vendors");
  }
});

Router.route("/", {
  name: "homeIndex",
  waitOn: function() {
    return Meteor.subscribe("all-products");
  }
});

Router.route("/account", {
  name: "accountHome"
});

Router.route("/login", function(){
    Router.go("accountHome");
});

Router.route("/sign-in", function(){
    Router.go("accountHome");
});

Router.route('/sign-out', {
  name: "signOut",
  onBeforeAction: function() {
    AccountsTemplates.logout();
    this.next();
  }
});

Router.route("/about", {
  name: "homeAbout"
});

Router.route("/contact", {
  name: "homeContact"
});

Router.route("/product/:_id", {
  name: "productsShow",
  waitOn: function() {
    return Meteor.subscribe("products-by-id", this.params._id);
  },
  data: function() {
    return Products.findOne({
      "_id": this.params._id
    });
  }
});

Router.route("/vendor/:slug", {
  name:"vendorsShow",
  waitOn: function() {
    return Meteor.subscribe("products-by-vendor", this.params.slug);
  },
  data:function(){
     return Vendors.findOne({
       slug: this.params.slug
     });
  }
});
