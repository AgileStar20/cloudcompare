import React, {Component} from 'react';
import main from '../services/main';

class Row extends Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.field = this.props.field+this.props.section.key+this.props.index;
	}
	// Events
	toggle(e, i){
		main.checkboxes[this.field+i]=!main.checkboxes[this.field+i];
		this.props.load(true);
	}
	render(){
		return (
			<tr>
			  <td ng-controller="FilterOptionsController" class="filter-features">
				{/*<div class="sidebar--batch-action">
				  <span class="clear" ng-show="hasAnySelectedFilters()" ng-click="clearAll()">Clear All</span>
				</div>*/}
				<filter-option-selector filter-option="getFilterOptions($parent.$parent.$index, feature_key)" feature-key="feature_key" selected-filters="selected_filters" />

				<section class="sidebar--filter">
				  <span class="sidebar--title mobile" ng-click="filter_option.expanded = !filter_option.expanded" ng-class="{'expanded': filter_option.expanded, 'collapsed': !filter_option.expanded}">
					 <span>| filter_option.label |</span>
					</span>
				  <ul class="sidebar--list">
					{main.options[this.props.index].values.map((value, i) => { return (
					  <li class="sidebar--option |filter_option.key|-|$index|">
						<label class="checkbox_wrap">
						  <input type="checkbox" value={main.checkboxes[this.field+i]} onChange={e=>{this.toggle(e, i)}}/>
						  <span class="checkbox_label">{value}</span>
						</label>
					  </li>
					)})}
				  </ul>
				</section>
			  </td>
			  {main.vendors.map(vendor => { return (
				<td class={'cloud-cell '+vendor.short_name}>
				  {this.data(vendor[this.props.section.key])}
				</td>
			  )})}
			</tr>
		);
	}
	data(arr){
		if(Array.isArray(arr)&&arr.length){
			return (
				<ul>
				{arr.map(feature => { return (
					<li class={feature.state}>
					<a href={feature.url} target="_blank" rel="noopener noreferrer" ng-switch-default>{feature.display} <span class="icon external-link left" /></a>
					</li>
				)})}
				</ul>
			);
		}else{
			return (<span class="no-data">No data available</span>);
		}
	}
}
export default Row