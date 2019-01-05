'use strict';
angular.module('cloudcompareApp').controller('FilterOptionsController', function($scope, SelectedFiltersService) {
  $scope.isExpanded = function() {
    return _.every($scope.filter_options, function(filterOption) { return filterOption.expanded; });
  };

  $scope.expandAll = function() {
    var isExpanded = $scope.isExpanded();
    _.each($scope.filter_options, function(filterOption) {
      filterOption.expanded = !isExpanded;
    });
  };

  $scope.getFilterOptions = function(index, feature_key) {

      for (var i = 0; i < $scope.filter_options.length; ++i) {

          if ($scope.filter_options[i].key == feature_key) {

              return $scope.filter_options[i];
          }
      }
  }

  $scope.clearAll = function() {
    $scope.selected_filters = SelectedFiltersService.reset($scope.filter_options);
  };

  $scope.hasAnySelectedFilters = function() {
    return _($scope.selected_filters).map(function(filterValues) {
      return _.values(filterValues);
    }).flatten().some();
  };
});
