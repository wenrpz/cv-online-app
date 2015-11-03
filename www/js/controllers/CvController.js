angular.module('cvonlineapp').controller('CvController', function($scope, $state, User, Cv){
  
  $scope.cvExists = null;


  $scope.hasCv = function() {
    return $scope.cvExists === true;
  }

  $scope.view = function(){
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
    
  }
})