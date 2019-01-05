'use strict';

angular.module('cloudcompareApp').directive('emailSelectedData', function(SelectedFiltersService) {
  return {
		restrict: 'E',
    templateUrl: 'views/email_selected_data.html',
    replace: false,
    scope: {
      label: '@'
    },
    link: function(scope, element) {
      
    }
  };
});
