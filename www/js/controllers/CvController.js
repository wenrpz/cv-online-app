angular.module('cvonlineapp').controller('CvController', function($scope, User, Cv){
  $scope.personalInfo = User.getProfile();
  $scope.data = {
    workExperiences: [],
    certificates: [],
    education: [],
    interests: [],
    references: []
  };
  $scope.cvExists = null;

  $scope.hasCv = function() {
    return $scope.cvExists === true;
  }

  $scope.addRow = function(obj) {
    obj.push({});
  }

  $scope.removeRow = function(obj, index) {
    obj.splice(index, 1);
  }

  $scope.save = function() {
    console.log('all data', $scope.data);
  }
  $scope.view = function(){
    Cv.getCv(function(cvData){
      Cv.getTemplateData(function(templateData){
        $scope.cvExists = true;
        var text = '<html>';
        text += '<head><style>' + templateData.css + '</style></head>';
        text += '<body>' + templateData.html + '</body>';
        text += '</html>';

        var html = ejs.render(text, cvData);

        var iframe= document.getElementById('cvView');
        var doc= iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
      });  
    }, function() {
      $scope.cvExists = false;
    })
    
  }
})