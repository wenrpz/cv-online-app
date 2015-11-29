angular.module('cvonlineapp').controller('EditCvController', function($scope, $state, User,Cv){
  console.log('entre');
  $scope.personalInfo = User.getProfile();
  $scope.EditableCvInfo = Cv.getCvEditableInfo();
  console.log('data de mi cv para editar: ',$scope.EditableCvInfo);
/*   $scope.view = function(){
    Cv.getCv(function(cvData){
      console.log(cvData);
      Cv.getTemplateData(function(templateData){
        console.log(templateData);
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
    
  }*/
 /* $scope.getCv =  Cv.getCv();
  console.log('data del cv', $scope.getCv);*/
})