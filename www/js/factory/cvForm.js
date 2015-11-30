angular.module('cvonlineapp').factory('CvForm', function(Cv, $q) {
  return {
    addRow: function(obj) {
      obj.push({});
    },

    removeRow: function(obj, index) {
      obj.splice(index, 1);
    },

    save: function(objData) {
      var deferred = $q.defer();
      var data = {
        id: objData.id,
        work_experiences: objData.work_experiences,
        educations: objData.educations
      };
      var fields = [];
      for(var i in objData.certificates) {
        fields.push({
          name: 'certificate',
          value: objData.certificates[i].data
        });
      }
      for(var i in objData.interests) {
        fields.push({
          name: 'interest',
          value: objData.interests[i].data
        });
      }
      for(var i in objData.references) {
        fields.push({
          name: 'reference',
          value: objData.references[i].data
        });
      }
      data.fields = fields;
      (data.id ? Cv.update : Cv.save)(data, function(response) {
        deferred.resolve(response);
      }, function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    }
  }
});