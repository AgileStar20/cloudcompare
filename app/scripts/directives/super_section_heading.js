'use strict';

angular.module('cloudcompareApp').directive('superSectionHeading', function(SelectedFiltersService) {
  return {
    templateUrl: 'views/super_section_heading.html',
    replace: true,
    scope: {
      label: '@',
      show_feature_headings: '=showFeatureHeadings',
      show_feature_rows: '=showFeatureRows'
    },
    link: function(scope, element) {
      function getSubRows() {
        return _($(element).nextUntil('[super-section-heading]')).filter(function(subRow) {
          return subRow.hasAttribute('features-heading');
        });
      }

      function isExpanded(subRows) {
      	return _.some(subRows, function(subRow) { return $(subRow).is(':visible'); });
      }

      function getFeatureKeys() {
        return _(getSubRows()).map(function(subRow) {
          return $(subRow).attr('feature-key');
        }).value();
      }

      scope.toggleSection = function() {
        var featureKeys = getFeatureKeys();
        var expanded = isExpanded(getSubRows());
        _.each(featureKeys, function(featureKey) {
          scope.show_feature_headings[featureKey] = !expanded;
        });
        scope.expanded = !expanded;
      };

      scope.expanded = isExpanded(getSubRows());

      scope.$on('FilterOptionSelector#filters-changed', function() {
        var featureKeys = getFeatureKeys();
        scope.filters_count = SelectedFiltersService.countByFeatureKeys(featureKeys);
      });
    }
  };
});
