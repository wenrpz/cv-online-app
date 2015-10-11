angular.module('cvonlineapp').service('User',
  ['API',function(){
    this.login = function(callback, callbackError){}
    this.checkUserLogin = function(){}
    this.setToken = function(){}
    this.clearAuthToken = function(){}
    this.profile = function(successCb, errorCb){}
    this.logout = function(successCb){}
}]);