import React, {Component} from 'react';
import main from '../services/main';

class Row extends Component{
	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
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
			<tr>
				<td class="filter-features">
					<section class="sidebar--filter">
						<ul class="sidebar--list">
						{main.options[this.props.index].values.map((value, i) => { return (
							<li class={"sidebar--option "+this.props.section.key+'-'+i+(main.checkboxes[this.field+i]&&' checked'||'')}>
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
				{arr.map((feature, i) => {
					return (
					<li class={feature.state+' '+this.props.section.key+'-'+i+(main.checkboxes[this.field+i]&&' checked'||'')}>
					<a href={feature.url} target="_blank" rel="noopener noreferrer">{feature.display} <span class="icon external-link left" /></a>
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