import React, { Component } from 'react';
import vendors from './vendors';
import sections from './sections';
import Field from './field'

import './App.css';

class App extends Component {
  render() {
    let sections_fields = [];
    for(let key in sections){
      sections_fields.push(key);
    }
    return (
      <div class="page-content layout--lg">
        <div class="wrapper">
          <header class="app_header">
            <a class="product_logo_wrap" href="/">
              <span class="rightscale_logo"></span>
            </a>
            <div class="export_link">
              <a class="button default small" data-placement="bottom" ng-click="openExport()">
                <span class="text">Export all data</span>
              </a>
            </div>
          </header>
          <section class="clouds-wrapper" ng-class="{'filters-visible': filters_visible}">
            <section class="clouds">
              <table>
                <thead>
                  <tr>
                    <th class="filter-features">
                      <div class="logo"></div>
                      <span class="button secondary subscribe">Subscribe to Updates</span>
                    </th>
                    {vendors.map(vendor => { return (
                      <th class={vendor.short_name}>
                        <div class="logo">
                          <img src={'/'+vendor.logo}></img>
                        </div>
                      </th>
                    )})}
                  </tr>
                </thead>
                <tbody ng-class="{'filters-selected': total_selected_filters > 0}">

                  {sections_fields.map(field => { return (
                    <Field field={field} sections={sections[field]} />
                  )})}

                </tbody>
              </table>
            </section>
            <section class="footer">
              <span class="footer-legal">
                &copy; 2016-2018 RightScale, Inc.
              </span>
              <span class="last-updated">
                Last updated: 2018/08/20
              </span>
            </section>
          </section>
          <section class="filter">
            <span ng-click="openHelp()" class="help-button"></span>
            <span ng-click="openCopy()" class="copyright-button"></span>
          </section>
        </div>
      </div>
    );
  }
}

export default App;