'use strict';

angular.module('cloudcompareApp').directive('vendorPercentageBar', function(SelectedFiltersService) {
  return {
    templateUrl: 'views/vendor_percentage_bar.html',
    replace: true,
    scope: {
      vendor: '=vendor'
    },
    link: function(scope, element) {
      scope.$on('FilterOptionSelector#filters-changed', function() {
        scope.total_selected_filters = SelectedFiltersService.count();
        scope.vendor_selected_filters = SelectedFiltersService.countByVendor(scope.vendor);

        scope.percentage = '0%';
        if (scope.total_selected_filters > 0) {
          scope.percentage = Math.round((scope.vendor_selected_filters / scope.total_selected_filters) * 100) + '%';
        }

        element.find('.percentage-bar').css('background', 'linear-gradient(90deg, rgba(128, 193, 26, 0.9) 0%, rgba(128, 193, 26, 0.95) ' + scope.percentage + ', rgba(244, 245, 247, 0.5) ' + scope.percentage + ')');
      }, true);
    }
  };
});
