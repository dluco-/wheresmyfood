UI.registerHelper("moment", function(){
  return moment().format("LL");
});

UI.registerHelper("momentRelative", function(fromDate) {
  return moment(fromDate).toNow();
});
