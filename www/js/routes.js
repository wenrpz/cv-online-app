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
    cache: false,
    views:{
      'app-cv': {
        templateUrl: 'templates/cv.html',
        controller: 'CvController'
      }
    }
  })
  .state('app.createCv',{
    url: '/create',
    views:{
      'app-cv': {
        templateUrl: 'templates/cv-create.html',
        controller: 'CreateCvController'
      }
    }
  })
  .state('app.editCv',{
    url: '/edit',
    views:{
      'app-cv': {
        templateUrl: 'templates/cv-edit.html',
        controller: 'EditCvController'
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
  .state('app.editProfile', {
    url: '/profile/edit',
    views: {
      'app-profile': {
        templateUrl: 'templates/edit-profile.html',
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
  $urlRouterProvider.otherwise('/login');
});