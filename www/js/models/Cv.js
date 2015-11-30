angular.module('cvonlineapp').service('Cv',
  ['Api','$localStorage',function(Api, $localStorage){
    this.getCv = function(successCb, errorCb){
      var self = this;
      this.getCvInfo().then(function(response) {
        self.setCvEditableInfo(response);
        successCb(response);
      }, function(err) {
        errorCb(err);
      });
    }

    this.setCvEditableInfo = function(cvData){
      if (!this.getDefaultTemplate()) {
        this.setDefaultTemplate(cvData.template_id || 1);
      }
    }

    this.getCvInfo = function(){
      return Api.get('/cv/my').then(function(response) {
        return response.data;
      });
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

    this.update = function(data, successCb, errorCb) {
      Api.post('/cv/' + data.id + '/edit', data).then(function(response) {
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