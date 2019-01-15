import sections from './sections';
import vendors from './vendors';
import options from './options';
import _ from 'underscore'

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

main.toggle = function(){
	main.total = 0;
	for (let i = 0; i < main.vendors.length; i++) {
		main.vendors[i]._total = 0;
	}
	for(let each in main.checkboxes){
		if(main.checkboxes[each]){
			main.total++;
			for (let i = 0; i < main.vendors.length; i++) {
				if(main.vendors[i][each.split('-')[0]][each.split('-')[1]].state){
					main.vendors[i]._total++;
				}
			}
		}
	}
  if(main.clean){
    for(let each in main.checkboxes){
      if(main.checkboxes[each]) return;
    }
    main.clean = false;
  }else{
    for(let each in main.checkboxes){
      if(main.checkboxes[each]){
        return main.clean = true;
      }
    }
  }
}
main.getSelectedFilters = () => {
	let selected = {};

	for(let key in main.checkboxes) {
		let pairs = key.split('-');
		if(!selected[pairs[0]]) {
			selected[pairs[0]] = [pairs[1]];
		}
	}

	for(let key in selected) {
		const option = _.findWhere(main.options, {key: key});

		if(option) {
			const indexes =  selected[key];
			selected[key] = [];

			for(let i  = 0; i < indexes.length; i++) {
				selected[key].push(option.values[indexes[i]]);
			}
		}
	}

	return selected;
}
export default main;
