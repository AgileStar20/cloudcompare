'use strict';

angular.module('cloudcompareApp').directive('featuresRow', function(SelectedFiltersService) {
  return {
    templateUrl: 'views/features_row.html',
    replace: true,
    scope: {
      vendors: '=',
      feature_key: '@featureKey',
      selected_filters: '=selectedFilters',
      filter_options: '=filterOptions',
      show_feature_headings: '=showFeatureHeadings',
      show_feature_rows: '=showFeatureRows'
    },
    link: function(scope) {
      scope.getCategoryNames = function(category) {
        if (_.isObject(category)) {
          return category;
        } else {
          return _(value).values().flatten().value();
        }
      };
      scope.isChecked = function(value) {
        return _.indexOf(scope.selected_values, value) !== -1;
      };

      scope.selected_values = [];

      scope.$on('FilterOptionSelector#filters-changed', function() {
        var selectedCategories = SelectedFiltersService.getSelectedCategories(scope.feature_key);
        scope.selected_values = SelectedFiltersService.getSelectedCategoryValues(scope.filter_options, scope.feature_key, selectedCategories);
      });
    }
  };
});
