angular.module('cvonlineapp').controller('CreateCvController', function($scope, $state, User, Cv){
  $scope.personalInfo = User.getProfile();
  $scope.data = {
    work_experiences: [],
    certificates: [],
    educations: [],
    interests: [],
    references: []
  };


  $scope.addRow = function(obj) {
    obj.push({});
  }

  $scope.removeRow = function(obj, index) {
    obj.splice(index, 1);
  }

  $scope.save = function() {
    var data = {
      work_experiences: $scope.data.work_experiences,
      educations: $scope.data.educations
    };
    var fields = [];
    for(var i in $scope.data.certificates) {
      fields.push({
        name: 'certificate',
        value: $scope.data.certificates.text
      });
    }
    for(var i in $scope.data.interests) {
      fields.push({
        name: 'interest',
        value: $scope.data.interests.text
      });
    }
    for(var i in $scope.data.references) {
      fields.push({
        name: 'reference',
        value: $scope.data.references.text
      });
    }
    data.fields = fields;
    Cv.save(data, function(response) {
      if (response.cv_id) {
        $state.go('app.cv');
      }
    }, function(error) {
      console.error(error);
      alert('Error guardando el CV.');
    });
  }
  
})