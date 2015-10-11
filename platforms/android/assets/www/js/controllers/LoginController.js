angular.module('cvonlineapp').controller('LoginController',['$scope','$state','ngFB', function($scope, $state, ngFB){

  $scope.login = function(){
     ngFB.login({scope: 'email'}).then(
        function (response) {
            console.log(response);
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $state.go('app.cv');
            } else {
                alert('Facebook login failed');
            }
        });
  }  
}]);
