angular.module('cvonlineapp').factory('Api',function($http, $q, Constants){
  return {
    post: function(endpoint, params) {
      var deferred = $q.defer();
      $http({
        url: Constants.API_URL + endpoint,
        method: "POST",
        data: params
      })
      .then(deferred.resolve, deferred.reject);
      return deferred.promise;
    },
    put: function(endpoint, params) {
      console.log($http.defaults.headers.common);
      var deferred = $q.defer();
      $http({
        url: Constants.API_URL + endpoint,
        method: "PUT",
        data: params
      })
      .then(deferred.resolve, deferred.reject);
      return deferred.promise;
    },
    delete: function(endpoint, params){
      console.log($http.defaults.headers);
     var deferred = $q.defer();
       $http({
        url: Constants.API_URL + endpoint,
        method: "DELETE",
        data: params
      })
      .then(deferred.resolve, deferred.reject);
      return deferred.promise;
    },
    setDefaultHeader: function(key, value){
      $http.defaults.headers.common[key] = value;
    },
    removeDefaultHeader: function(key){
      delete $http.defaults.headers.common[key];
    }
  };
});