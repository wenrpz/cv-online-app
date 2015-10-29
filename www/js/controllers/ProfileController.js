angular.module('cvonlineapp').controller('ProfileController',function($scope, $state, ngFB, User){
  $scope.profile = User.getProfile();
  console.log($scope.profile);
  $scope.getPicture = function() {
    ngFB.api({
      path: '/me',
      params: {fields: 'id,name,email,picture'}
    }).then(
      function (user) {
        console.log(User.getProfile());
        $scope.profile.facebook = user;
      },
      function (error) {
          alert('Facebook error: ' + error.error_description);
      }
    );
  }

  $scope.logout = function() {
    ngFB.logout().then(function() {
      User.logout();
      $state.go('login');
    });
  }

  $scope.removeAccount =function() {
    if (confirm('Desea eliminar la cuenta?')) {
      User.deleteUser(function() {
        $state.go('login');
        console.log('User deleted');
      });
    }
  }

  $scope.save = function() {
    User.update($scope.profile, function(response) {
      User.setUserData($scope.profile);
      $state.go('app.profile');
      console.log(response, $scope.profile);
    },function(error) {
      console.log(error);
    });
  }

  $scope.getPicture();
})