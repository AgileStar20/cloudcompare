import sections from './sections';
import vendors from './vendors';
import options from './options';
for (var i = 0; i < options.length; i++) {
	options[i].values = Array.from(new Set(vendors[0][options[i].values].map(function (p) {
		return p.name;
	})));
}
const main = {
	sections: sections,
	vendors: vendors,
	options: options,
	checkboxes: {},
	clean: false
}
export default main;