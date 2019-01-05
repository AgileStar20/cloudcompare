'use strict';

angular.module('cloudcompareApp').factory('SelectedFiltersService', function($q, LinkService, $rootScope, CloudVendorsService) {
  var selectedFilters = {};

  var SelectedFiltersService = {
    get: function() {
      return selectedFilters;
    },
    set: function(value) {
      selectedFilters = value;
      return selectedFilters;
    },
    reset: function(filterOptions) {
      return SelectedFiltersService.set(_.reduce(filterOptions, function(h, filterOption) { h[filterOption.key] = {}; return h; }, {}));
    },
    getSelectedCategories: function(featureKey) {
      return _(selectedFilters[featureKey]).pickBy(function(key) { return key; }).keys().value();
    },
    getSelectedCategoryValues: function(filterOptions, featureKey, selectedCategories) {
      var filterOption = _.find(filterOptions, function(filterOption) { return filterOption.key === featureKey; });
      if (!filterOption) {
        return [];
      }
      return _(filterOption.categoryValueMap).pick(selectedCategories).values().flatten().value();
    },
    count: function() {
      return _(selectedFilters).keys().map(function(featureKey) {
        return SelectedFiltersService.getSelectedCategories(featureKey).length;
      }).sum();
    },
		countByVendor: function(vendor, filterOptions) {
			var currentCount = [];

			for (var filter in selectedFilters) {
						var currentFilter = selectedFilters[filter];
						var currentFilterKeys = Object.keys(currentFilter);
						if (currentFilterKeys.length > 0) {
							var _iteratorNormalCompletion = true;
							var _didIteratorError = false;
							var _iteratorError = undefined;

							try {
								for (var _iterator = currentFilterKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
									var currentKey = _step.value;
									var _iteratorNormalCompletion2 = true;
									var _didIteratorError2 = false;
									var _iteratorError2 = undefined;

									try {
										for (var _iterator2 = vendor[filter][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
											var feature = _step2.value;

											if (feature.name === currentKey && feature.state === true && currentFilter[currentKey] === true) {
												currentCount.push(feature.name);
											}
										}
									} catch (err) {
										_didIteratorError2 = true;
										_iteratorError2 = err;
									} finally {
										try {
											if (!_iteratorNormalCompletion2 && _iterator2.return) {
												_iterator2.return();
											}
										} finally {
											if (_didIteratorError2) {
												throw _iteratorError2;
											}
										}
									}
								}
							} catch (err) {
								_didIteratorError = true;
								_iteratorError = err;
							} finally {
								try {
									if (!_iteratorNormalCompletion && _iterator.return) {
										_iterator.return();
									}
								} finally {
									if (_didIteratorError) {
										throw _iteratorError;
									}
								}
							}
						}
					}
					return currentCount.length;
				},
    countByFeatureKeys: function(featureKeys) {
      var a = _(featureKeys).map(function(featureKey) {
        return SelectedFiltersService.getSelectedCategories(featureKey).length;
      }).sum();
      return a;
    },
    countByFeatureKey: function(featureKey) {
      return SelectedFiltersService.countByFeatureKeys([featureKey]);
    },
    buildLink: function() {
      return LinkService.buildLink(selectedFilters);
    },
    loadFromUrl: function(filterOptions) {
      return SelectedFiltersService.set(LinkService.parseLink(filterOptions));
    },
		exportAll: function() {
			var promise = CloudVendorsService.getAll().then(function (cloudServices) {
				var data = [];
				for (var category in cloudServices[0]) {
					var currentCategory = cloudServices[0][category];
					switch(category) {
					case "vm_sizes":
						var section = "Basic";
						var mainCategory = "VM Sizes";
						break;
					case "sla_terms":
						var section = "Basic";
						var mainCategory = "SLA Terms";
						break;
					case "certifications":
						var section = "Basic";
						var mainCategory = "Certifications";
						break;
					case "operating_systems":
						var section = "Basic";
						var mainCategory = "Operating Systems";
						break;
					case "regions":
						var section = "Basic";
						var mainCategory = "Regions";
						break;
					case "countries":
						var section = "Basic";
						var mainCategory = "Countries";
						break;
					case "compute_services":
						var section = "Core Services";
						var mainCategory = "Compute Services";
						break;
					case "network_services":
						var section = "Core Services";
						var mainCategory = "Network Services";
						break;
					case "storage_services":
						var section = "Core Services";
						var mainCategory = "Storage Services";
						break;
					case "relational_dbs":
						var section = "Database Services";
						var mainCategory = "Relational Databases";
						break;
					case "nonrelational_dbs":
						var section = "Database Services";
						var mainCategory = "Non_Relational Databases";
						break;
					case "other_dbs":
						var section = "Database Services";
						var mainCategory = "Other DBaaS";
						break;
					case "data_analytics_services":
						var section = "Additional Services";
						var mainCategory = "Data & Analytics Services";
						break;
            case "ai_machine_learning":
  						var section = "Additional Services";
  						var mainCategory = "AI and Machine Learning";
  						break;
					case "application_services":
						var section = "Additional Services";
						var mainCategory = "Application Services";
						break;
					case "security_identity":
						var section = "Additional Services";
						var mainCategory = "Security & Identity";
						break;
					default:
						var section = "N/A";
						var mainCategory = "N/A";
					}

					if (currentCategory instanceof Array === false) {
						continue;
					}
					for (var i = 0; i < currentCategory.length; ++i) {
						var service = { Section: section, Category: mainCategory, Feature: currentCategory[i].name };
						for (var j = 0; j < cloudServices.length; ++j) {
							service[cloudServices[j].name] = cloudServices[j][category][i].display;
							if (cloudServices[j][category][i].url !== "multi") {
								service[cloudServices[j].short_name] = cloudServices[j][category][i].url;
							} else if (cloudServices[j][category][i].url === "multi") {
								service[cloudServices[j].short_name] = cloudServices[j][category][i].multiurl;
							}
						}
						data.push(service);
					}
				}
				return data;
			});
			return promise;
		},
		exportSelected: function() {
			var returnSelected = _(selectedFilters).mapValues(function (values) {
				return _(values).pickBy(_.identity).keys().value();
			}).pickBy(function (value) {
				return !_.isEmpty(value);
			}).value();
			var promise = CloudVendorsService.getAll().then(function (cloudServices) {
				function getServiceStateInClouds(service) {
					var serviceStateObject = {};
					serviceStateObject["Section"] = section;
					serviceStateObject["Category"] = mainCategory;
					serviceStateObject["Feature"] = service;
					for (var i = 0; i < cloudServices.length; ++i) {
						var currentCloudService = cloudServices[i];
						for (var category in currentCloudService) {
							for (var j = 0; j < currentCloudService[category].length; ++j) {
								if (currentCloudService[category][j].name === service) {
									serviceStateObject[currentCloudService.name] = currentCloudService[category][j].display;
									if (currentCloudService[category][j].url !== "multi") {
										serviceStateObject[currentCloudService.short_name] = currentCloudService[category][j].url;
									} else if (currentCloudService[category][j].url === "multi") {
										serviceStateObject[currentCloudService.short_name] = currentCloudService[category][j].multiurl;
									}
								}
							}
						}
					}
					return serviceStateObject;
				}
				var data = [];
				for (var selectedFilter in returnSelected) {
					switch(selectedFilter) {
					case "vm_sizes":
						var section = "Basic";
						var mainCategory = "VM Sizes";
						break;
					case "sla_terms":
						var section = "Basic";
						var mainCategory = "SLA Terms";
						break;
					case "certifications":
						var section = "Basic";
						var mainCategory = "Certifications";
						break;
					case "operating_systems":
						var section = "Basic";
						var mainCategory = "Operating Systems";
						break;
					case "regions":
						var section = "Basic";
						var mainCategory = "Regions";
						break;
					case "countries":
						var section = "Basic";
						var mainCategory = "Countries";
						break;
					case "compute_services":
						var section = "Core Services";
						var mainCategory = "Compute Services";
						break;
					case "network_services":
						var section = "Core Services";
						var mainCategory = "Network Services";
						break;
					case "storage_services":
						var section = "Core Services";
						var mainCategory = "Storage Services";
						break;
					case "relational_dbs":
						var section = "Database Services";
						var mainCategory = "Relational Databases";
						break;
					case "nonrelational_dbs":
						var section = "Database Services";
						var mainCategory = "Non_Relational Databases";
						break;
					case "other_dbs":
						var section = "Database Services";
						var mainCategory = "Other DBaaS";
						break;
					case "data_analytics_services":
						var section = "Additional Services";
						var mainCategory = "Data & Analytics Services";
						break;
					case "application_services":
						var section = "Additional Services";
						var mainCategory = "Application Services";
						break;
					case "security_identity":
						var section = "Additional Services";
						var mainCategory = "Security & Identity";
						break;
					default:
						var section = "N/A";
						var mainCategory = "N/A";
					}
					for (var j = 0; j < returnSelected[selectedFilter].length; ++j) {
						data.push(getServiceStateInClouds(returnSelected[selectedFilter][j]));
					}
				}
				return data;
			});
			return promise;
		}
	};

  return SelectedFiltersService;
});
