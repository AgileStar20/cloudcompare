import React, {Component} from 'react';
import Field from './field';
import main from '../services/main';

class Section extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.load = this.load.bind(this);
  }
  // Events
  show = true;
  toggle(){
    this.show = !this.show;
    this.load();
  }
  load(){
    this.setState({
      showComponent: true
    });
  }

  // Html
  render() {
    let st = "section-super-title";
    if(this.show) st += ' collapsed';
    else st += ' expanded';
    return (
      <div>
        <tr class={st} onClick={this.toggle}>
          <th>
            <h2>{this.props.field}</h2>
            {this.count()}
          </th>
        </tr>
        { this.show && (
          <Field field={this.props.field} sections={this.props.sections} load={this.load} />
        ) }
        <tr></tr>
      </div>
    )
  }
  count(){
    let count = 0;
    for(let key in main.checkboxes){
      if(key.indexOf(this.props.field)>-1 && main.checkboxes[key]) count++;
    }
    if(!count) return '';
    return (<span class="filter-count"><strong>{count}</strong> filters selected</span>);
  }
}
export default Section