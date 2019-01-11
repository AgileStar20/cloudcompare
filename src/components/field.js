import React, {Component} from 'react';
import Row from './row';
import main from '../services/main';

class Field extends Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.refresh = this.refresh.bind(this);
	}
	// Events
	show = {};
	toggle(index){
		this.show[index] = !this.show[index];
		this.refresh();
	}
	refresh(parent=false){
		this.setState({
			showComponent: true
		});
		if(parent) this.props.refresh();
	}
	// html
	render(){
		return this.props.sections.map((section, index) => { return (
			<React.Fragment>
				<tr className="section-title" onClick={e=>{this.toggle(index)}}>
					<th>
						<h4>{section.label}</h4>
						{this.count(section.key+index)}
					</th>
				</tr>
				{ !this.show[index] && (
					<Row field={this.props.field} sections={this.props.sections} section={section} index={index} refresh={this.refresh} />
				) }
			</React.Fragment>
		) } )
	}
	count(label){
		let count = 0;
		for(let key in main.checkboxes){
			if(key.indexOf(label)>-1 && main.checkboxes[key]) count++;
		}
		if(count) return (<span className="filter-count"><strong>{count}</strong> filters selected</span>);
	}
}
export default Field