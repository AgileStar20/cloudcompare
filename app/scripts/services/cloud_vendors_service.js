'use strict';

angular.module('cloudcompareApp').factory('CloudVendorsService', function($q, $http) {
  var cloudVendors;

  return {
    getAll: function(refresh) {
      if (refresh || !cloudVendors) {
        return $http.get('data/cloud_vendors.json').then(function(response) {
          cloudVendors = response.data;
          return cloudVendors;
        });
      } else {
        var deferrer = $q.defer();
        deferrer.resolve(cloudVendors);
        return deferrer.promise;
      }
    }
  };
});
