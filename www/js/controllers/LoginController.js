angular.module('cvonlineapp').controller('LoginController', 
  ['$scope','$state','ngFB', 'User', function($scope, $state, ngFB, User){

    $scope.login = function(){
      ngFB.login({scope: 'email'}).then(function (response) {
        if (response.status == 'connected') {
          User.login(response.authResponse.accessToken, function(response){
            console.log('CONTR SUCCESS', response);
            $state.go('app.cv');
          }, function(response){
            console.log('CONTR ERROR', response);
          });
        } else {
          alert('Facebook login failed');
        }
      });
    }

    if (User.isLoggedIn()){
      $state.go('app.profile');
    }
  }]
);
