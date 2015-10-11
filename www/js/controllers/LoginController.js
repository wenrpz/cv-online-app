angular.module('cvonlineapp').controller('LoginController',['$scope','$state','$openFB', function($scope, $state, $openFB){

  $scope.login = function(){
     $openFB.login({scope: 'email'}).then(
        function (token) {
            if (token) {
                console.log('Facebook login succeeded');
                $state.go('app.cv');
            } else {
                alert('Facebook login failed');
            }
        });
  }  
}]);
