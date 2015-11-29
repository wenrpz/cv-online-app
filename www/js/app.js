// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('cvonlineapp', ['ionic', 'ionic.wizard', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB, Constants) {
  ngFB.init(Constants.FB);
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function(){
  if(window.localStorage['fb_token']){
    window.sessionStorage.setItem('fbAccessToken', window.localStorage['fb_token']);
  }
})
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})
/*.config(function ($stateProvider, $httpProvider, $urlRouterProvider) {
  // We need to setup some parameters for http requests
  // These three lines are all you need for CORS support
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})*/