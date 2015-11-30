angular.module('cvonlineapp').controller('CreateCvController', function($scope, $state, User, CvForm, Cv){
  $scope.personalInfo = User.getProfile();
  $scope.data = {
    work_experiences: [],
    certificates: [],
    educations: [],
    interests: [],
    references: []
  };


  $scope.addRow = function(obj) {
    CvForm.addRow(obj);
  }

  $scope.removeRow = function(obj, index) {
    CvForm.removeRow(obj);
  }

  $scope.save = function() {
    CvForm.save($scope.data).then(function(response) {
      if (response.cv_id) {
        $state.go('app.cv');
      }
    }, function(error) {
      console.error(error);
    });
  }
  
})