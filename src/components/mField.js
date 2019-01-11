import React, {Component} from 'react';
import main from '../services/main';
console.log('called');
class mField extends Component{
	constructor(props){
		console.log('we are in');
		super(props);
		this.toggle = this.toggle.bind(this);
		console.log(this.props.section);
		this.field = this.props.section.key+'-';
	}
	// Events
	toggle(e, i){
		main.checkboxes[this.field+i]=!main.checkboxes[this.field+i];
		main.total = 0;
		for (var i = 0; i < main.vendors.length; i++) {
			main.vendors[i]._total = 0;
		}
		for(let each in main.checkboxes){
			if(main.checkboxes[each]){
				main.total++;
				for (var i = 0; i < main.vendors.length; i++) {
					if(main.vendors[i][each.split('-')[0]][each.split('-')[1]].state){
						main.vendors[i]._total++;
					}
				}
			}
		}
		this.props.refresh(true);
	}
	// html
	render(){
		return (
			<React.Fragment>
				<section class="sidebar--filter">
					<span class="sidebar--title mobile">
					{/* ng-click="filter_option.expanded = !filter_option.expanded" ng-class="{'expanded': filter_option.expanded, 'collapsed': !filter_option.expanded}"*/}
						<span>{this.props.section.label}</span>
					</span>
					<ul class="sidebar--list">
						<li class="sidebar--option |filter_option.key|-|$index|" ng-repeat="value in filter_option.categories | orderBy:'toString()'">
							<div class="checkbox_wrap">
								<input type="checkbox" id="|filter_option.key|::|value|" name="|filter_option.key|[]" value="|value|" ng-model="selected_filters[filter_option.key][value]" />
								<label for="|filter_option.key|::|value|" class="checkbox_label">| value |</label>
							</div>
						</li>
					</ul>
				</section>
			</React.Fragment>
		)
	}
	data(arr){
		if(Array.isArray(arr)&&arr.length){
			return (
				<ul>
				{arr.map((feature, i) => {
					return (
					<li className={feature.state+' '+this.props.section.key+'-'+i+(main.checkboxes[this.field+i]&&' checked'||'')}>
					<a href={feature.url} target="_blank" rel="noopener noreferrer">{feature.display} <span className="icon external-link left" /></a>
					</li>
				)})}
				</ul>
			);
		}else{
			return (<span className="no-data">No data available</span>);
		}
	}
}
export default mField