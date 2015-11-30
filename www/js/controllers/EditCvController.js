angular.module('cvonlineapp').controller('EditCvController', function($scope, $state, User,Cv, CvForm){
  $scope.personalInfo = User.getProfile();
  var editableInfo = {};

  $scope.data = {
    work_experiences: [],
    educations: [],
    certificates: [],
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
    console.log('edit', $scope.data);
    CvForm.save($scope.data).then(function(response) {
      if (response == 'OK') {
        $state.go('app.cv');
      }
    }, function(error) {
      console.error(error);
    });
  }

  function getDateValue (datestr) {
    return new Date(datestr);
  }

  function getRepeater(data) {
    var arr = [];
    for(var i in data) {
      data[i].start_date = getDateValue(data[i].start_date);
      data[i].end_date = getDateValue(data[i].end_date);
      arr.push(data[i]);
    }
    return arr;
  }

  function transformData() {
    $scope.data.id = editableInfo.id;
    $scope.data.work_experiences = getRepeater(editableInfo.work_experiences);
    $scope.data.educations = getRepeater(editableInfo.educations);
    for(var i in editableInfo.fields) {
      var data = {data: editableInfo.fields[i].value};
      switch(editableInfo.fields[i].name) {
        case 'certificate':
          $scope.data.certificates.push(data);
          break;
        case 'interest':
          $scope.data.interests.push(data);
          break;
        case 'reference':
          $scope.data.references.push(data);
          break;
      }
    }
  }

  Cv.getCvInfo().then(function(response) {
    editableInfo = response;
    transformData();
  });
})