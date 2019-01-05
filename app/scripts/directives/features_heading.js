'use strict';

angular.module('cloudcompareApp').directive('featuresHeading', function(SelectedFiltersService) {
  return {
    templateUrl: 'views/features_heading.html',
    replace: true,
    scope: {
      label: '@',
      feature_key: '@featureKey',
      show_feature_headings: '=showFeatureHeadings',
      show_feature_rows: '=showFeatureRows',
    },
    link: function(scope) {
      scope.show_feature_headings[scope.feature_key] = scope.show_feature_headings[scope.feature_key] || true;
      scope.show_feature_rows[scope.feature_key] = scope.show_feature_rows[scope.feature_key] || true;

			

      scope.$on('FilterOptionSelector#filters-changed', function() {
        scope.filters_count = SelectedFiltersService.countByFeatureKey(scope.feature_key);
      });
    }
  };
});
