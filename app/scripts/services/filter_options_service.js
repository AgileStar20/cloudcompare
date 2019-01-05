'use strict';

angular.module('cloudcompareApp').factory('FilterOptionsService', function($q, CloudVendorsService) {
  var filterOptions;

	function getUniqueValues(cloudVendors, property) {
			var values = Array.from(new Set(cloudVendors[0][property].map(function (p) {
					return p.name;
			})));
			return values;
	}

  function loadFromCloudVendors(cloudVendors) {
    var filterOptions = [
      {
        key: 'vm_sizes',
        label: 'VM Sizes',
        values: getUniqueValues(cloudVendors, 'vm_sizes'),
        expanded: true
      },
      {
        key: 'sla_terms',
        label: 'SLA Terms',
        values: getUniqueValues(cloudVendors, 'sla_terms'),
        expanded: true
      },
      {
        key: 'discounts',
        label: 'Discounts',
        values: getUniqueValues(cloudVendors, 'discounts'),
        expanded: true
      },
      {
        key: 'certifications',
        label: 'Security Certifications',
        values: getUniqueValues(cloudVendors, 'certifications'),
        expanded: true
      },
      {
        key: 'operating_systems',
        label: 'Operating Systems',
        values: getUniqueValues(cloudVendors, 'operating_systems'),
        expanded: true
      },
      {
        key: 'regions',
        label: 'Regions',
        values: getUniqueValues(cloudVendors, 'regions'),
        expanded: true
      },
      {
        key: 'countries',
        label: 'Countries',
        values: getUniqueValues(cloudVendors, 'countries'),
        expanded: true
      },
      {
        key: 'compute_services',
        label: 'Compute Services',
        values: getUniqueValues(cloudVendors, 'compute_services'),
        expanded: true
      },
      {
        key: 'network_services',
        label: 'Network Services',
        values: getUniqueValues(cloudVendors, 'network_services'),
        expanded: true
      },
      {
        key: 'storage_services',
        label: 'Storage Services',
        values: getUniqueValues(cloudVendors, 'storage_services'),
        expanded: true
      },
      {
        key: 'relational_dbs',
        label: 'Relational Databases',
        values: getUniqueValues(cloudVendors, 'relational_dbs'),
        expanded: true
      },
      {
        key: 'nonrelational_dbs',
        label: 'Non-Relational Databases',
        values: getUniqueValues(cloudVendors, 'nonrelational_dbs'),
        expanded: true
      },
      {
        key: 'other_dbs',
        label: 'Other DBaaS',
        values: getUniqueValues(cloudVendors, 'other_dbs'),
        expanded: true
      },
			{
				key: 'data_analytics_services',
				label: 'Data & Analytics Services',
				values: getUniqueValues(cloudVendors, 'data_analytics_services'),
				expanded: true
			},
      {
				key: 'ai_machine_learning',
				label: 'AI and Machine Learning',
				values: getUniqueValues(cloudVendors, 'ai_machine_learning'),
				expanded: true
			},
      {
        key: 'application_services',
        label: 'Application Services',
        values: getUniqueValues(cloudVendors, 'application_services'),
        expanded: true
      },
      {
        key: 'security_identity',
        label: 'Security & Identity',
        values: getUniqueValues(cloudVendors, 'security_identity'),
        expanded: true
      },
    ];

    // Assign default categories / categoryValueMaps
    _.each(filterOptions, function(filterOption) {
      if (_.isUndefined(filterOption.categories)) {
        filterOption.categories = filterOption.values;
      }
      if (_.isUndefined(filterOption.categoryValueMap)) {
        filterOption.categoryValueMap = _(filterOption.categories).reduce(function(hash, category) {
          hash[category] = _.filter(filterOption.values, function(value) { return value === category; });
          return hash;
        }, {});
      }
    });

    return filterOptions;
  }

  return {
    getAll: function(refresh) {
      if (refresh || !filterOptions) {
        return CloudVendorsService.getAll().then(function(cloudVendors) {
          filterOptions = loadFromCloudVendors(cloudVendors);
          return filterOptions;
        });
      } else {
        var deferrer = $q.defer();
        deferrer.resolve(filterOptions);
        return deferrer.promise;
      }
    }
  };
});
