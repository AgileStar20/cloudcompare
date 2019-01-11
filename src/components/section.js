import React, {Component} from 'react';
import Field from './field';
import main from '../services/main';

class Section extends Component{
  constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  // Events
  show = true;
  toggle(){
    this.show = !this.show;
    this.refresh();
  }
  refresh(){
    this.setState({
      showComponent: true
    });
    if(main.clean){
      for(let each in main.checkboxes){
        if(main.checkboxes[each]) return this.props.refresh();
      }
      main.clean = false;
      this.props.refresh();
    }else{
      for(let each in main.checkboxes){
        if(main.checkboxes[each]){
          main.clean = true;
          return this.props.refresh();
        }
      }
    }
  }

  // html
  render() {
    let st = "section-super-title";
    if(this.show) st += ' collapsed';
    else st += ' expanded';
    return (
      <React.Fragment>
        <tr class={st} onClick={this.toggle}>
          <th>
            <h2>{this.props.field}</h2>
            {this.count()}
          </th>
        </tr>
        { this.show && (
          <Field field={this.props.field} sections={this.props.sections} refresh={this.refresh} />
        ) }
        <tr></tr>
      </React.Fragment>
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