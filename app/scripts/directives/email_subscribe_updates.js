'use strict';

angular.module('cloudcompareApp').directive('emailSubscribeUpdates', function(SelectedFiltersService) {
  return {
		restrict: 'E',
    templateUrl: 'views/email_subscribe_updates.html',
    replace: false,
    scope: {
      label: '@'
    },
    link: function(scope, element) {
      
    }
  };
});
