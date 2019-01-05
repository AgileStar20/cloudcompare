'use strict';

angular.module('cloudcompareApp').directive('emailExportedData', function(SelectedFiltersService) {
  return {
		restrict: 'E',
    templateUrl: 'views/email_exported_data.html',
    replace: false,
    scope: {
      label: '@'
    },
    link: function(scope, element) {
      
    }
  };
});
