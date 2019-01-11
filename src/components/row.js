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
		this.props.refresh(true);
	}
	// html
	render(){
		return (
			<tr>
				<td ng-controller="FilterOptionsController" class="filter-features">
					<section class="sidebar--filter">
						<ul class="sidebar--list">
						{main.options[this.props.index].values.map((value, i) => { return (
							<li class="true sidebar--option checked">
							{/*|filter_option.key|-|$index| */}
								<label class="checkbox_wrap">
									<input type="checkbox" checked={main.checkboxes[this.field+i]||false} onChange={e=>{this.toggle(e, i)}}/>
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
					<li class="true sidebar--option checked">
					{/*<li class={feature.state}>*/}
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