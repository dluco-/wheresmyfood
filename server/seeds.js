var today = new Date();
var productsSeeds = [{
  "sku": "4088",
  "name": "Bananas",
  "image": "banana.png",
  "summary": "Yellow fruit",
  "description": "This fruit will make your life awesome!",
  "price": 100,
  "bought_date": today,
  "best_before_date": today,
  "status": "published",
  "unit": {
    "id": 1,
    "slug": "unit-kg",
    "name": "kg"
  },
  "vendor": {
    "id": 1,
    "slug": "fyffes",
    "name": "Fyffes Bananas Ltd"
  },
  "ean": [
    123,
    321
  ]
}, {
  "sku": "3050",
  "name": "Cucumber",
  "image": "cucumber.jpg",
  "summary": "Long and green",
  "description": "More of this and your head will blow",
  "price": 65,
  "bought_date": today,
  "best_before_date": today,
  "status": "published",
  "unit": {
    "id": 1,
    "slug": "unit-kg",
    "name": "kg"
  },
  "vendor": {
    "id": 2,
    "slug": "brinks",
    "name": "Brinks gurkor"
  },
  "ean": [
    111
  ]
}, {
  "sku": "1593",
  "name": "Apples",
  "image": "apples.jpg",
  "summary": "Tasty red apples, mans best friend",
  "description": "Apples, what else?",
  "price": 165,
  "bought_date": today,
  "best_before_date": today,
  "status": "published",
  "unit": {
    "id": 1,
    "slug": "unit-kg",
    "name": "kg"
  },
  "vendor": {
    "id": 3,
    "slug": "rudenstam",
    "name": "Rudenstams äpplen"
  },
  "ean": [
    999,
    888
  ]
},
{
  "sku": "",
  "name": "Fint Salt med jod",
  "image": "",
  "summary": "Fint hushållssalt",
  "description": "",
  "price": 10,
  "volume": "600g",
  "bought_date": today,
  "best_before_date": today,
  "status": "published",
  "unit": {
    "id": 2,
    "slug": "unit-st",
    "name": "st"
  },
  "vendor": {
    "id": 4,
    "slug": "jozo",
    "name": "Jozo"
  },
  "ean": [
    8715800002315
  ]
}];

var vendorsSeed = [
  {
    id: 1,
    slug: "fyffes",
    name: "Fyffes Bananas Ltd"
  },
  {
    id: 2,
    slug: "brinks",
    name: "Brinks gurkor"
  },
  {
    id: 3,
    slug: "rudenstam",
    name: "Rudenstams äpplen"
  }
];

if (Products.find().count() === 0) {
  _.each(productsSeeds, function(product) {
    Products.insert(product);
    console.log("Inserted", product.sku);
  });
}

if (Meteor.users.find().count() === 0) {
  var id = Accounts.createUser({
    username: "Administrator",
    email: "denolsson@gmail.com",
    password: "123456",
    profile: { name: "Dennis Olsson" },
    roles: []
  });

  Roles.addUsersToRoles(id, ["Administrator"]);
  console.log("Added admin user...");
}

if (Vendors.find().count() === 0) {
  _.each(vendorsSeed, function(vendor){
    Vendors.insert(vendor);
    console.log("Inserted vendor", vendor.slug);
  });
}
