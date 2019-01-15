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
		main.toggle();
		this.props.refresh(true);
	}
	// html
	render(){
		return (
			<tr>
				<td className="filter-features">
					<section className="sidebar--filter">
						<ul className="sidebar--list">
						{main.options.find((opt) => { return opt.key === this.props.section.key}).values.map((value, i) => { return (
							<li key={value+'-'+i}  className={"sidebar--option " + this.props.section.key + '-' + i + (main.checkboxes[this.field+i] && ' checked' || '')}>
								<label className="checkbox_wrap">
									<input type="checkbox" checked={main.checkboxes[this.field+i]||false} onChange={e=>{this.toggle(e, i)}}/>
									<span className="checkbox_label">{value}</span>
								</label>
							</li>
						)})}
						</ul>
					</section>
				</td>
				{main.vendors.map((vendor, i) => { return (
				<td key={this.props.section.key + '_v' + i} className={'cloud-cell '+vendor.short_name}>
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
					<li key={this.props.section.key+'-'+i} className={feature.state+' '+this.props.section.key+'-'+i+(main.checkboxes[this.field+i]&&' checked'||'')}>
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
export default Row
