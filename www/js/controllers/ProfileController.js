angular.module('cvonlineapp').controller('ProfileController',function($scope, $state, ngFB, User){
  $scope.profile = User.getProfile();

  $scope.getPicture = function() {
    ngFB.api({
      path: '/me',
      params: {fields: 'id,name,email,picture'}
    }).then(
      function (user) {
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
        console.log('User deleted');
      });
    }
  }

  $scope.save = function() {
    User.update($scope.user, function(response) {
      console.log(response);
    },function(error) {
      console.log(error);
    });
  }

  $scope.getPicture();
})