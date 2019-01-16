import sections from './sections';
import vendors from './vendors';
import options from './options';
import _ from 'underscore'
import lodash from 'lodash'

for (let i = 0; i < options.length; i++) {
	options[i].values = vendors[0][options[i].values].map(function (p) {
		return p.name;
	});
}
let sections_fields = [];
for (let key in sections) {
	sections_fields.push(key);
}

const main = {
	sections_fields: sections_fields,
	sections: sections,
	vendors: vendors,
	options: options,
	checkboxes: {},
	total: 0,
	clean: false
};

main.toggle = function () {
	main.total = 0;
	for (let i = 0; i < main.vendors.length; i++) {
		main.vendors[i]._total = 0;
	}
	for (let each in main.checkboxes) {
		if (main.checkboxes[each]) {
			main.total++;
			for (let i = 0; i < main.vendors.length; i++) {
				if (main.vendors[i][each.split('-')[0]][each.split('-')[1]].state) {
					main.vendors[i]._total++;
				}
			}
		}
	}
	if (main.clean) {
		for (let each in main.checkboxes) {
			if (main.checkboxes[each]) return;
		}
		main.clean = false;
	} else {
		for (let each in main.checkboxes) {
			if (main.checkboxes[each]) {
				return main.clean = true;
			}
		}
	}
}
main.getSelectedFilters = () => {
	let selected = {};

	for (let key in main.checkboxes) {
		let pairs = key.split('-');
		if (!selected[pairs[0]]) {
			selected[pairs[0]] = [pairs[1]];
		}
	}

	for (let key in selected) {
		const option = _.findWhere(main.options, {key: key});

		if (option) {
			const indexes = selected[key];
			selected[key] = [];

			for (let i = 0; i < indexes.length; i++) {
				selected[key].push(option.values[indexes[i]]);
			}
		}
	}

	return selected;
}
main.getCsvHeaders = () => {
	return [
		{label: 'Section', key: 'Section'},
		{label: 'Category', key: 'Category'},
		{label: 'Feature', key: 'Feature'},
		{label: 'AWS', key: 'Amazon Web Services'},
		{label: 'AWS URL', key: 'aws'},
		{label: 'Azure', key: 'Microsoft Azure'},
		{label: 'Azure URL', key: 'azure'},
		{label: 'Google', key: 'Google Cloud Platform'},
		{label: 'Google URL', key: 'google'},
		{label: 'IBM', key: 'IBM Cloud'},
		{label: 'IBM URL', key: 'ibm'}];
}
main.exportSelectedData = () => {
	let data = [];
	let section = "";
	let mainCategory = "";

	let returnSelected = lodash(main.getSelectedFilters()).mapValues(function (values) {
		return lodash(values).pickBy(lodash.identity).keys().value();
	}).pickBy(function (value) {
		return !lodash.isEmpty(value);
	}).value();

	const getServiceStateInClouds = (category, service) => {
		let serviceStateObject = {};
		serviceStateObject["Section"] = section;
		serviceStateObject["Category"] = mainCategory;
		serviceStateObject["Feature"] = service;
		for (let i = 0; i < main.vendors.length; ++i) {
			let currentCloudService = main.vendors[i];
			serviceStateObject[currentCloudService.name] = currentCloudService[category][service].display;
			if (currentCloudService[category][service].url !== "multi") {
				serviceStateObject[currentCloudService.short_name] = currentCloudService[category][service].url;
			} else if (currentCloudService[category][service].url === "multi") {
				serviceStateObject[currentCloudService.short_name] = currentCloudService[category][service].multiurl;
			}
		}
		return serviceStateObject;
	}

	for (let selectedFilter in returnSelected) {
		switch (selectedFilter) {
			case "vm_sizes":
				section = "Basic";
				mainCategory = "VM Sizes";
				break;
			case "sla_terms":
				section = "Basic";
				mainCategory = "SLA Terms";
				break;
			case "certifications":
				section = "Basic";
				mainCategory = "Certifications";
				break;
			case "operating_systems":
				section = "Basic";
				mainCategory = "Operating Systems";
				break;
			case "regions":
				section = "Basic";
				mainCategory = "Regions";
				break;
			case "countries":
				section = "Basic";
				mainCategory = "Countries";
				break;
			case "compute_services":
				section = "Core Services";
				mainCategory = "Compute Services";
				break;
			case "network_services":
				section = "Core Services";
				mainCategory = "Network Services";
				break;
			case "storage_services":
				section = "Core Services";
				mainCategory = "Storage Services";
				break;
			case "relational_dbs":
				section = "Database Services";
				mainCategory = "Relational Databases";
				break;
			case "nonrelational_dbs":
				section = "Database Services";
				mainCategory = "Non_Relational Databases";
				break;
			case "other_dbs":
				section = "Database Services";
				mainCategory = "Other DBaaS";
				break;
			case "data_analytics_services":
				section = "Additional Services";
				mainCategory = "Data & Analytics Services";
				break;
			case "application_services":
				section = "Additional Services";
				mainCategory = "Application Services";
				break;
			case "security_identity":
				section = "Additional Services";
				mainCategory = "Security & Identity";
				break;
			default:
				section = "N/A";
				mainCategory = "N/A";
		}
		for (let j = 0; j < returnSelected[selectedFilter].length; ++j) {
			data.push(getServiceStateInClouds(selectedFilter, returnSelected[selectedFilter][j]));
		}
	}

	return data;
}
main.exportAllData = () => {
	let data = [];
	let section = "";
	let mainCategory = "";

	for (let category in main.vendors[0]) {
		let currentCategory = main.vendors[0][category];
		switch (category) {
			case "vm_sizes":
				section = "Basic";
				mainCategory = "VM Sizes";
				break;
			case "sla_terms":
				section = "Basic";
				mainCategory = "SLA Terms";
				break;
			case "certifications":
				section = "Basic";
				mainCategory = "Certifications";
				break;
			case "operating_systems":
				section = "Basic";
				mainCategory = "Operating Systems";
				break;
			case "regions":
				section = "Basic";
				mainCategory = "Regions";
				break;
			case "countries":
				section = "Basic";
				mainCategory = "Countries";
				break;
			case "compute_services":
				section = "Core Services";
				mainCategory = "Compute Services";
				break;
			case "network_services":
				section = "Core Services";
				mainCategory = "Network Services";
				break;
			case "storage_services":
				section = "Core Services";
				mainCategory = "Storage Services";
				break;
			case "relational_dbs":
				section = "Database Services";
				mainCategory = "Relational Databases";
				break;
			case "nonrelational_dbs":
				section = "Database Services";
				mainCategory = "Non_Relational Databases";
				break;
			case "other_dbs":
				section = "Database Services";
				mainCategory = "Other DBaaS";
				break;
			case "data_analytics_services":
				section = "Additional Services";
				mainCategory = "Data & Analytics Services";
				break;
			case "ai_machine_learning":
				section = "Additional Services";
				mainCategory = "AI and Machine Learning";
				break;
			case "application_services":
				section = "Additional Services";
				mainCategory = "Application Services";
				break;
			case "security_identity":
				section = "Additional Services";
				mainCategory = "Security & Identity";
				break;
			default:
				section = "N/A";
				mainCategory = "N/A";
		}

		if (currentCategory instanceof Array === false) {
			continue;
		}
		for (let i = 0; i < currentCategory.length; ++i) {
			let service = {Section: section, Category: mainCategory, Feature: currentCategory[i].name};
			for (let j = 0; j < main.vendors.length; ++j) {
				service[main.vendors[j].name] = main.vendors[j][category][i].display;
				if (main.vendors[j][category][i].url !== "multi") {
					service[main.vendors[j].short_name] = main.vendors[j][category][i].url;
				} else if (main.vendors[j][category][i].url === "multi") {
					service[main.vendors[j].short_name] = main.vendors[j][category][i].multiurl;
				}
			}
			data.push(service);
		}
	}

	return data;
}
export default main;
