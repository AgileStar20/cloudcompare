import React, {Component} from 'react';
import Section from './components/section';
import main from './services/main';

class App extends Component {
    constructor(props) {
        super(props);
        this.clean = this.clean.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.setState({
            showComponent: true
        });
    }

    clean() {
        for (let each in main.checkboxes) {
            main.checkboxes[each] = false;
        }
        main.clean = false;
        this.setState({
            showComponent: true
        });
    }

    render() {
        let sections_fields = [];
        for (let key in main.sections) {
            sections_fields.push(key);
        }
        return (
            <React.Fragment>
                <div class="page-content layout--lg">
                    <div class="wrapper">

                        {main.clean && (
                            <div class="sidebar--batch-action">
                                <span class="clear" onClick={this.clean}>Clear All</span>
                            </div>
                        )}

                        <header class="app_header">
                            <a class="product_logo_wrap" href="/">
                                <span class="rightscale_logo"></span>
                            </a>
                            <div class="export_link">
                  <span class="button default small" data-placement="bottom" ng-click="openExport()">
                    <span class="text">Export all data</span>
                  </span>
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

                                        {main.vendors.map(vendor => {
                                            return (
                                                <th class={vendor.short_name}>
                                                    <div class="logo">
                                                        <img src={'/' + vendor.logo} alt={vendor.short_name}></img>
                                                    </div>
                                                </th>
                                            )
                                        })}

                                    </tr>
                                    </thead>
                                    <tbody ng-class="{'filters-selected': total_selected_filters > 0}">

                                    {sections_fields.map(field => {
                                        return (
                                            <Section field={field} sections={main.sections[field]} refresh={this.refresh}/>
                                        )
                                    })}

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
                <div className="page-content layout--sm">
                    <div className="wrapper">
                        <header className="app_header">
                            <a className="product_logo_wrap" href="/">
                                <span className="rightscale_logo"></span>
                            </a>
                            <div className="export_link" ng-csv="exportAll()" csv-header="getHeaders()" filename="rightscale-cloud-comparison-data.csv">
                                <a className="button default small" data-placement="bottom">
                                    <span className="text">Export all data</span>
                                </a>
                            </div>
                            <div className="export_link" ng-show="total_selected_filters > 0" ng-csv="exportSelected()" csv-header="getHeaders()" filename="rightscale-cloud-comparison-filtered-data.csv">
                                <a className="share_button button default small" data-placement="bottom">
                                    <span className="text">Export selected</span>
                                </a>
                            </div>
                            <span onClick="openHelp()" className="help-button"></span>
                        </header>
                        <section className={'clouds-wrapper ' + (/*this.state.filters_visible*/ false ? 'filters-visible' : '')}>
                            <section className="clouds">
                                <table>
                                    <thead>
                                    <tr>
                                        {main.vendors.map(vendor => {
                                            return (
                                                <th className={vendor.short_name + ' checked'}>
                                                    <div className="logo">
                                                        <img src={'/' + vendor.logo_mobile} alt={vendor.short_name}></img>
                                                    </div>
                                                    {/*<vendor-percentage-bar vendor="vendor"></vendor-percentage-bar>*/}
                                                </th>
                                            )
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody ng-class="{'filters-selected': total_selected_filters > 0}">

                                    {sections_fields.map(field => {
                                        return (
                                            <Section field={field} sections={main.sections[field]} refresh={this.refresh}/>
                                        )
                                    })}

                                    </tbody>

                                </table>
                            </section>
                        </section>
                        {/*<section className="sidebar" ng-controller="FilterOptionsController">*/}
                        {/*<div className="sidebar--batch-action">*/}
                        {/*<span className="expand" onClick="expandAll" ng-class="{'expanded': isExpanded()}">*/}
                        {/*<img src="images/icon-chevron-white.svg"><span>{{isExpanded() ? 'Collapse All' : 'Expand All'}}</span>*/}
                        {/*<span className="clear" ng-show="hasAnySelectedFilters()" ng-click="clearAll()">Clear All</span>*/}
                        {/*</div>*/}
                        {/*<filter-option-selector ng-repeat="filter_option in filter_options" filter-option="filter_option" selected-filters="selected_filters">*/}
                        {/*</section>*/}
                        <section className="footer" id="last">
                            <span className="footer-legal">
                                &copy; 2016-2018 RightScale, Inc.
                              </span>
                            <span className="last-updated">
                                Last updated: 2018/08/20
                              </span>
                        </section>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
