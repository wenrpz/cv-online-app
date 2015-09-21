angular.module('cvonlineapp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  });

  $urlRouterProvider.otherwise('login');
});