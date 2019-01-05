'use strict';

angular.module('cloudcompareApp').factory('LinkService', function($location) {
  return {
    buildLink: function(selectedFilters) {
      var formattedFilters = _(selectedFilters).mapValues(function(values) {
        return _(values).pickBy(_.identity).keys().value();
      }).pickBy(function(value) { return !_.isEmpty(value); }).value();
      return $location.absUrl().substring(0, $location.absUrl().lastIndexOf($location.url())) + $location.path() + '?filters=' + encodeURIComponent(JSON.stringify(formattedFilters));
    },
    parseLink: function(filterOptions) {
      var formattedFilters = {};
      try {
        formattedFilters = JSON.parse($location.search().filters);
      } catch(e) {
      }
      var selectedFilters = _.reduce(filterOptions, function(h, filterOption) { h[filterOption.key] = {}; return h; }, {});
      _.each(formattedFilters, function(filterValues, filterKey) {
        _.each(filterValues, function(filterValue) {
          selectedFilters[filterKey][filterValue] = true;
        });
      });
      return selectedFilters;
    }
  };
});
