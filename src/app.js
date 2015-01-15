// Requires
var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');
var Accel = require('ui/accel');

Accel.init();

// Static Cards
var splashWindow = new UI.Window({
  title:'Fetching Data',
  subtitle:'Please Wait'
});

Settings.config(
  { url: 'https://linustechtips.com/main/index.php?app=core&module=global&section=login'}
);

// Display Splash Card
splashWindow.show();

var API ='http://linustechtips.com/main/page/api.php';

var updateData = function(){
ajax(
  {
    url: API,
    type: 'json',
  },
  function(data) {
    console.log("Grabbed data");
  var infoCard = new UI.Menu({
  sections: [{
    title: 'LinusTech Tips',
    items: [{
      title: 'Username',
      subtitle: data.display_name 
    }, {
      title: 'New Messages',
      subtitle: data.new_pms,
    }, {
      title: 'New Notifications',
      subtitle: data.new_notifications
    }]
  }]
});
    infoCard.hide();
    infoCard.show();
    splashWindow.hide();
    },
  function(error) {
    console.log("Error fetching Data");
  });
};


updateData();
Accel.on("tap", updateData(), console.log('Updated Data'));
