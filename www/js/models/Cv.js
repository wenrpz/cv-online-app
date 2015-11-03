angular.module('cvonlineapp').service('Cv',
  ['Api','$localStorage',function(Api, $localStorage){
    this.createCv = function(callback, callbackError){}
    this.seeCv = function(callback, callbackError){}
    this.editCv = function(callback, callbackError){}
    this.changeCv = function(callback, callbackError){}

    this.getCv = function(successCb, errorCb){
      if(this.getDefaultTemplate()) {
        successCb({});
      } else {
        errorCb({});
      }
    }
    this.getTemplates = function(successCb, errorCb){
      Api.get('/template/list').then(function(response){
        console.log(response.data);
        successCb(response.data);
      },function(error){
        errorCb(error);
      })
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