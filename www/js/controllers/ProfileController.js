angular.module('cvonlineapp').controller('ProfileController',function($scope, $state, ngFB, User, $timeout, $cordovaCamera){
  $scope.profile = User.getProfile();
  
  $scope.getPicture = function() {
    ngFB.api({
      path: '/me',
      params: {fields: 'id,name,email,picture'}
    }).then(
      function (user) {
        $scope.profile.facebook = user;
        if (User.hasProfilePicture()) {
          $scope.photo = User.getProfilePicture();
        } else {
          $scope.photo = 'http://graph.facebook.com/'+$scope.profile.facebook.id +'/picture?width=270&height=270';;
        }
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
    },function(error) {
      console.log(error);
    });
  }

  $scope.changePhoto = function(sourceType){
    var source = Camera.PictureSourceType.CAMERA;
    if (sourceType =='gallery') {
      source = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    }
    var options = {
      cameraDirection: Camera.Direction.FRONT,
      sourceType: source,
      destinationType: Camera.DestinationType.DATA_URL,
      correctOrientation: true
    };
    document.addEventListener("deviceready", function () {
      $cordovaCamera.getPicture(options).then(function(imageURI) {
        $timeout(function() {
          $scope.photo = "data:image/jpeg;base64," + imageURI;
          User.changePhoto(imageURI);
        }, 0);
      }, function(err) {
        console.log(err);
      });
    }, false);
  }

  $scope.getPicture();
})