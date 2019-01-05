'use strict';

/**
 * @ngdoc function
 * @name cloudcompareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cloudcompareApp
 */
angular.module('cloudcompareApp').controller('MainCtrl', function($http, $scope, CloudVendorsService, FilterOptionsService, SelectedFiltersService, ngDialog, $cookies, $location, $rootScope, $timeout) {
  $scope.filters_visible = true;
  $scope.show_feature_headings = {};
  $scope.show_feature_rows = {};
	$scope.show_subscribe = true;

  $scope.sections = {
    'Basic': [
      {key: 'vm_sizes', label: 'VM Sizes'},
      {key: 'sla_terms', label: 'SLA Terms'},
      {key: 'discounts', label: 'Discounts'},
      {key: 'certifications', label: 'Certifications'},
      {key: 'operating_systems', label: 'Operating Systems'},
      {key: 'regions', label: 'Regions'},
      {key: 'countries', label: 'Countries'}
    ],
    'Core Services': [
      {key: 'compute_services', label: 'Compute Services'},
      {key: 'network_services', label: 'Network Services'},
      {key: 'storage_services', label: 'Storage Services'}
    ],
    'Database Services': [
      {key: 'relational_dbs', label: 'Relational Databases'},
      {key: 'nonrelational_dbs', label: 'Non_Relational Databases'},
      {key: 'other_dbs', label: 'Other DBaaS'}
    ],
    'Additional Services': [
			{key: 'data_analytics_services', label: 'Data & Analytics Services'},
      {key: 'ai_machine_learning', label: 'AI and Machine Learning'},
      {key: 'application_services', label: 'Application Services'},
      {key: 'security_identity', label: 'Security & Identity'}
    ]
  };

  $scope.openHelp = function() {
    ngDialog.open({
      template: 'modal',
      className: 'ngdialog-theme-default ngdialog-theme-custom',
      showClose: false,
      closeByEscape: true,
			name: 'help box'
    });
  };

	$scope.openForm = function() {
		ngDialog.openConfirm({
			template: 'modal-2',
			className: 'ngdialog-theme-default ngdialog-theme-custom',
			showClose: true,
			closeByEscape: true,
			name: 'form box',
			scope: $scope
		}
		).then(
			function(isValid) {

			  if (isValid) {

				  // Setting cookie to hide subscribe once filled out form
				  $cookies.put('cloud_compare_subscribe', 'true', {
				    'expires': 'Tue, 19 Jan 2038 03:14:07 UTC'
				  });

					$scope.show_subscribe = false;

					$scope.fields_to_gather = [];
					var form = $("form");

			    form.find("input").map(function(i, field) {if(field.type.match(/text|email|tel|hidden|radio|checkbox/)) { $scope.fields_to_gather.push(field.name); }});
			    form.find("select").map(function(i, field) { $scope.fields_to_gather.push(field.name); });


					var fields_to_gather = $scope.fields_to_gather;
					var form = $("form");
					$scope.saveForm(fields_to_gather, form);
			     }

	},
	function(validate) {
		//Cancel or do nothing
		}
	);
	};

	$scope.openExport = function() {
		ngDialog.openConfirm({
			template: 'modal-3',
			className: 'ngdialog-theme-default ngdialog-theme-custom',
			showClose: true,
			closeByEscape: true,
			name: 'export box',
			scope: $scope
		}
		).then(
			function(isValid) {

			  if (isValid) {

					$scope.fields_to_gather = [];
					var form = $("form");

			    form.find("input").map(function(i, field) {if(field.type.match(/text|email|tel|hidden|radio|checkbox/)) { $scope.fields_to_gather.push(field.name); }});
			    form.find("select").map(function(i, field) { $scope.fields_to_gather.push(field.name); });


					var fields_to_gather = $scope.fields_to_gather;
					var form = $("form");
					$scope.saveForm(fields_to_gather, form);
			     }

	},
	function(validate) {
		//Cancel or do nothing
		}
	);
	};

	$scope.openSelected = function() {
		ngDialog.openConfirm({
			template: 'modal-4',
			className: 'ngdialog-theme-default ngdialog-theme-custom',
			showClose: true,
			closeByEscape: true,
			name: 'selected box',
			scope: $scope
		}
		).then(
			function(isValid) {

			  if (isValid) {

					$scope.fields_to_gather = [];
					var form = $("form");

			    form.find("input").map(function(i, field) {if(field.type.match(/text|email|tel|hidden|radio|checkbox/)) { $scope.fields_to_gather.push(field.name); }});
			    form.find("select").map(function(i, field) { $scope.fields_to_gather.push(field.name); });


					var fields_to_gather = $scope.fields_to_gather;
					var form = $("form");
					$scope.saveForm(fields_to_gather, form);
			     }

	},
	function(validate) {
		//Cancel or do nothing
		}
	);
	};

	$scope.saveForm = function(fields, form) {

		$(FormHandler.send_marketing_data(fields, form, FormHandler.handle_marketing_response));

	}	;

  $scope.buildLink = function() {
    return SelectedFiltersService.buildLink();
  };

  $scope.generateShareLink = function() {
    $scope.share_link_loading = true;
    $scope.share_link = SelectedFiltersService.buildLink();
    $scope.share_link_generated = true;
  };

		$scope.getHeaders = function() {
		  	return ["Section", "Category", "Feature", "AWS", "AWS URL", "Azure", "Azure URL", "Google", "Google URL", "IBM", "IBM URL"];
		};

		$scope.exportSelected = function() {
		return SelectedFiltersService.exportSelected();
		};

		$scope.exportAll = function() {
		return SelectedFiltersService.exportAll();
		};

  $scope.$on('FilterOptionSelector#filters-changed', function() {
    $scope.share_link_generated = false;
    $scope.selected_filters = SelectedFiltersService.get();
    $scope.total_selected_filters = SelectedFiltersService.count();
  });

  CloudVendorsService.getAll().then(function(cloudVendors) {
    $scope.vendors = cloudVendors;
  });

  FilterOptionsService.getAll().then(function(filterOptions) {
    $scope.filter_options = filterOptions;
    $scope.selected_filters = SelectedFiltersService.reset(filterOptions);
    if (!_.isEmpty($location.search())) {
      $scope.selected_filters = SelectedFiltersService.loadFromUrl(filterOptions);
      $timeout(function() {
        $rootScope.$broadcast('FilterOptionSelector#filters-changed');
      });
    }
  });

	$scope._mkt_trk = $cookies.get('_mkto_trk');
	$scope.query_parameters = $cookies.get('cookie[RS_query_parameters]');

  var rsModal = $cookies.get('RS_modal');
  if (!rsModal) {
    $scope.openHelp();
  }

	var ccSubscribed = $cookies.get('cloud_compare_subscribe');
	if(ccSubscribed) {
		$scope.show_subscribe = false;
	}

  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 365);
  // Setting the cookie
  $cookies.put('RS_modal', 'true', {
    'expires': expireDate
  });

});

angular.module('cloudcompareApp').filter('multi', function($sce) { return $sce.trustAsHtml; });
