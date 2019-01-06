import React, {Component} from 'react';
import vendors from './vendors';

/*
 ng-class="{checked: isChecked(feature.name)}" class={feature.state+' '+this.props.field+'-'+index}

<span ng-switch-when="null">{feature.display}</span>
<span ng-switch-when="multi" ng-bind-html="feature.multidisplay | multi"></span>
*/

class Field extends Component{
  render() {
    function data(arr){
      if(Array.isArray(arr)&&arr.length){
        return (
          <ul>
            {arr.map(feature => { return (
            <li class={feature.state}>
              <a href={feature.url} target="_blank" ng-switch-default>{feature.display} <span class="icon external-link left" /></a>
            </li>
            )})}
          </ul>
        );
      }else{
        return (<span class="no-data">No data available</span>);
      }
    }
    return (
      <div>
        <tr class="section-super-title" ng-click="toggleSection()" ng-class="{expanded: expanded, collapsed: !expanded}">
          <th>
            <h2>{this.props.field}</h2>
            <span class="filter-count" ng-show="filters_count > 0"><strong>|filters_count|</strong> filters selected</span>
          </th>
        </tr>
        {this.props.sections.map(section => { return (
          <div>
            <tr class="section-title" ng-show="show_feature_headings[feature_key]" ng-click="show_feature_rows[feature_key] = !show_feature_rows[feature_key]" ng-class="{active: show_feature_rows[feature_key]}">
              <th>
                <h4>{section.label}</h4>
                <span class="filter-count" ng-show="filters_count > 0"><strong>|filters_count|</strong> filters selected</span>
              </th>
            </tr>
            <tr ng-show="show_feature_headings[feature_key] && show_feature_rows[feature_key]">
              <td ng-controller="FilterOptionsController" class="filter-features">
                <div class="sidebar--batch-action">
                  <span class="clear" ng-show="hasAnySelectedFilters()" ng-click="clearAll()">Clear All</span>
                </div>
                <filter-option-selector filter-option="getFilterOptions($parent.$parent.$index, feature_key)" feature-key="feature_key" selected-filters="selected_filters" />

                <section class="sidebar--filter">
                  <span class="sidebar--title mobile" ng-click="filter_option.expanded = !filter_option.expanded" ng-class="{'expanded': filter_option.expanded, 'collapsed': !filter_option.expanded}">
                     <span>| filter_option.label |</span>
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




              </td>
              {vendors.map(vendor => { return (
                <td class={'cloud-cell '+vendor.short_name}>
                  {data(vendor[section.key])}
                </td>
              )})}
            </tr>
          </div>
        )})}
        <tr></tr>
      </div>
    )
  }
}
export default Field