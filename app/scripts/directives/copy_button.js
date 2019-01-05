'use strict';

angular.module('cloudcompareApp').directive('copyButton', function($timeout) {
  return {
    restrict: 'E',

    replace: true,

    scope: {
      value: '@',
      beforeTooltip: '@', // default "Click to copy text"
      afterTooltip: '@' // default "Copied"
    },

    template: '<button value="{{ value }}" class="button default small" data-tooltip="{{ tooltip }}" data-clipboard-text="{{ value }}"><span class="icon icon-copy-grey"></span></button>',

    link: function (scope, element) {
      var triggered = false;
      scope.tooltip = scope.beforeTooltip || 'Copy to clipboard';

      var clip = new Clipboard(element.get(0));

      clip.on('success', function () {
        scope.tooltip = scope.afterTooltip || 'Copied';
        // force angular to update tooltip before we display it
        scope.$digest();
        $timeout(function () {
          element.tooltip('show');
          triggered = true;
        });
      });

      clip.on('mouseover', function () {
        element.tooltip('show');
      });

      clip.on('mouseout', function () {
        if (triggered) {
          scope.tooltip = scope.beforeTooltip || 'Copy to clipboard';
          scope.$digest(); // force cycle
          triggered = false;
        }
        element.tooltip('hide');
      });

      scope.$on('$destroy', function () {
        clip.destroy();
      });
    }
  };
});
