import sections from './sections';
import vendors from './vendors';
import options from './options';
for (var i = 0; i < options.length; i++) {
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
export default main;