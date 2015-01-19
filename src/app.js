// Requires
var UI = require('ui');
var ajax = require('ajax');
var Settings = require('settings');
var Accel = require('ui/accel');

//Settings
Settings.config(
  { url: 'http://wferr.com/LinusTechTips-Pebble/'}
);

// Splash Window
var splashWindow = new UI.Card({
  title:'Fetching Data',
  subtitle:'Please Wait'
});
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
      subtitle: data.nickname 
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
//Call Function to Update Data
updateData();

//Start Accelerometer Refresh 
Accel.init();
Accel.on("tap", updateData(), console.log('Updated Data'));
