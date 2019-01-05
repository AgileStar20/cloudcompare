'use strict';
angular.module('cloudcompareApp')
    .controller('FormController', function($scope) {
      $scope.subscribe = false;
			var isChecked = false;
			    $scope.changeSta = function() {
						$("#CloudCompare_Subscribe").val($scope.subscribe);
						if($scope.subscribe) {
							$("#Offer_Source__c").attr("value", "Cloud Compare");
						} else {
							$("#Offer_Source__c").attr("value", "Cloud Compare - Report");
						}
			    };
    });
