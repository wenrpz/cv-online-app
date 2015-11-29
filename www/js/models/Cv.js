angular.module('cvonlineapp').service('Cv',
  ['Api','$localStorage',function(Api, $localStorage){
    this.getCv = function(successCb, errorCb){
      var self = this;
      Api.get('/cv/my').then(function(response) {
        self.setCvEditableInfo(response.data);
        successCb(response.data);
      }, function(err) {
        errorCb(err);
      });
    }

    this.setCvEditableInfo = function(cvData){
      if (!$localStorage.get('default-template')) {
        $localStorage.set('default-template', cvData.template_id || 1);
      }
      $localStorage.setObject('cv-editable-info', cvData);
    }

    this.getCvEditableInfo = function(){
      $localStorage.get('cv-editable-info');
    }  
    
    this.getTemplates = function(successCb, errorCb){
      Api.get('/template/list').then(function(response){
        console.log(response.data);
        successCb(response.data);
      },function(error){
        errorCb(error);
      })
    }

    this.save = function(data, successCb, errorCb) {
      Api.post('/cv/create', data).then(function(response) {
        successCb(response.data);
      }, function(err) {
        errorCb(err);
      });
    }

    this.setDefaultTemplate = function(id){
      $localStorage.set('default-template', id);
    }

    this.getDefaultTemplate = function(){
      return $localStorage.get('default-template');
    }
    this.getTemplateData = function(successCb, errorCb) {
      var defaultTemplate = $localStorage.get('default-template');
      Api.get('/template/' + defaultTemplate).then(function(response){
        successCb({
          css: response.data.css,
          html: response.data.html
        });
      },function(error){
        errorCb(error);
      })
    }
}]);