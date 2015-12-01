angular.module('cvonlineapp').service('User', function(Api, $localStorage, $cordovaFileTransfer){
    this.auth = {};

    this.login = function(token, successCb, errorCb){
      var self = this;
      Api.post('/user/login', { "fb_token": token }).then(function(response) {
        self.setData(response.data);
        successCb(response.data);
      }, function(error){
        self.create(token).then(function(response) {
          self.setData(response.data);
          successCb(response.data);
        }, function(error) {
          errorCb(error);
        });
      });
    }

    this.create = function(token, successCb, errorCb) {
      return Api.post('/user/create', { "fb_token": token });
    }

    this.update = function(data, successCb, errorCb){
      Api.put('/user/edit', data).then(function(response) {
        console.log(response);
        successCb(response.data);
      }, function(error){
        errorCb(error);
      });
    }
    
    this.isLoggedIn = function(){
      if($localStorage.get('X-Session-Id') && $localStorage.get('X-Session-Id')!= ''){
        this.setToken($localStorage.get('X-Session-Id'));
        return true;
      }
      return false;
    }
    
    this.deleteUser = function(successCb){
      var self = this;
      Api.delete('/user/delete').then(function(response){
        self.destroyToken();
        successCb(response);
      })
    }

    this.setData = function(data){
      this.setToken(data.session_id);
      $localStorage.setObject('userData', data.user_data)
      $localStorage.set('fb_token', data.fb_token)
    }

    this.hasProfilePicture = function() {
      return !!$localStorage.get('profile-picture');
    }

    this.getProfilePicture = function(){
      return $localStorage.get('profile-picture');
    }

    this.setToken = function(token){
      $localStorage.set('X-Session-Id',token);
      Api.setDefaultHeader('X-Session-Id', token);
    }
    
    this.destroyToken = function(){
      $localStorage.remove('X-Session-Id');
      $localStorage.remove('userData');
      Api.removeDefaultHeader['X-Session-Id'];
    }
    
    this.getProfile = function(){
      return $localStorage.getObject('userData');
    }
    this.setUserData = function(profileInfo){
      $localStorage.setObject('userData', profileInfo);
    }

    this.changePhoto = function(imageData) {
      $localStorage.set('profile-picture', "data:image/jpeg;base64," + imageData);
      // return Api.upload('/user/changeProfilePicture', imageData).then(function(response) {
      //   console.log(response);
      //   return response;
      // });
    }
    
    this.logout = function(){
      var self  = this;
      self.destroyToken();
    }
  }
);