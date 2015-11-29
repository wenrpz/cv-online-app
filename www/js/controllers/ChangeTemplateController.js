angular.module('cvonlineapp').controller('ChangeTemplateController',['$scope','$state','Cv', function($scope, $state, Cv){
  $scope.templates = [];
  $scope.defaultTemplateId = Cv.getDefaultTemplate();

  $scope.listTemplate = function(){    
    Cv.getTemplates(function(response){
      console.log(response.templates);
      $scope.templates = response.templates;    
    })
  }

  $scope.selectTemplate = function(id) {
    $scope.defaultTemplateId =id;
    Cv.setDefaultTemplate(id);
  }

  $scope.listTemplate();
}]);
