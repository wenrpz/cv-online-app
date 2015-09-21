angular.module('cvonlineapp').controller('LoginController',['$scope','$state', function($scope, $state){
  console.log('TEST CONTROLLER'); 
  $scope.login = function(){
    console.log('login');
    $state.go('app.cv');
  }  
}]);
