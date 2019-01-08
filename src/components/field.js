import React, {Component} from 'react';
import Row from './row';
import main from '../services/main';

class Field extends Component{
	constructor(props){
		super(props);
    this.toggle = this.toggle.bind(this);
    this.load = this.load.bind(this);
  }
  // Events
  show = {};
  toggle(index){
    this.show[index] = !this.show[index];
    this.load();
  }
  load(parent=false){
    this.setState({
      showComponent: true
    });
    if(parent) this.props.load();
  }
	render(){
		return this.props.sections.map((section, index) => { return (
			<div>
				<tr class="section-title" onClick={e=>{this.toggle(index)}} ng-class="{active: show_feature_rows[feature_key]}">
					<th>
						<h4>{section.label}</h4>
						{this.count(section.key+index)}
					</th>
				</tr>
        { !this.show[index] && (
          <Row field={this.props.field} sections={this.props.sections} section={section} index={index} load={this.load} />
        ) }
			</div>
		) } )
	}
  count(label){
    let count = 0;
    for(let key in main.checkboxes){
      if(key.indexOf(label)>-1 && main.checkboxes[key]) count++;
    }
    if(count) return (<span class="filter-count"><strong>{count}</strong> filters selected</span>);
  }
}
export default Field