angular.module('cvonlineapp').config(function($stateProvider,$urlRouterProvider){
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginController'
  })
  .state('app',{
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'MenuController'
  })
  .state('app.cv',{
    url: '/cv',
    views:{
      'app-cv': {
        templateUrl: 'templates/cv.html',
        controller: 'CvController'
      }
    }
  })
  .state('app.profile', {
      url: '/profile',
      views: {
        'app-profile': {
          templateUrl: 'templates/profile.html',
          controller: 'ProfileController'
        }
      }
    })  
  .state('app.change-template', {
      url: '/change-template',
      views: {
        'app-change-template': {
          templateUrl: 'templates/change-template.html',
          controller: 'ChangeTemplateController'
        }
      }
    });
  $urlRouterProvider.otherwise('login');
});