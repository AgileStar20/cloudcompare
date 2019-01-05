'use strict';

angular.module('cloudcompareApp').directive('filterOptionSelector', function($rootScope, SelectedFiltersService) {
  return {
    templateUrl: 'views/filter_option_selector.html',
    scope: {
      filter_option: '=?filterOption',
      selected_filters: '=?selectedFilters',
      feature_key: '@featureKey'
    },
    link: function(scope) {
      scope.clearFilterKey = function(filterKey) {
        scope.selected_filters[filterKey] = {};
      };

      scope.hasAnySelectedFilters = function(filterKey) {
        return _.some(_.values(scope.selected_filters[filterKey]));
      };

      scope.$watch('selected_filters', function(selectedFilters, oldSelectedFilters) {
        if (!_.isEqual(selectedFilters, oldSelectedFilters)) {
          SelectedFiltersService.set(selectedFilters);
          $rootScope.$broadcast('FilterOptionSelector#filters-changed');
        }
      }, true);
    }
  };
});
