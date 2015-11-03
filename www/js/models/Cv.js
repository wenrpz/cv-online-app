angular.module('cvonlineapp').service('Cv',
  ['Api','$localStorage',function(Api, $localStorage){
    this.getCv = function(successCb, errorCb){
      Api.get('/cv/my').then(function(response) {
        successCb(response.data);
      }, function(err) {
        errorCb(err);
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

    this.setDefaultTemplate = function(id){
      $localStorage.set('default-template', id);
    }

    this.getDefaultTemplate = function(){
      return $localStorage.get('default-template');
    }
    this.getTemplateData = function(successCb, errorCb) {
      Api.get('/template/'+ $localStorage.get('default-template')).then(function(response){
        successCb({
          css: response.data.css,
          html: response.data.html
        });
      },function(error){
        errorCb(error);
      })
    }
}]);