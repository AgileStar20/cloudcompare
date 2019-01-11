import React, {Component} from 'react';
import Section from './components/section';
import mField from './components/mField';
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
				return (
					<React.Fragment>
						<div className="page-content layout--lg">
							<div className="wrapper">

									{main.clean && (
											<div className="sidebar--batch-action">
													<span className="clear" onClick={this.clean}>Clear All</span>
											</div>
									)}

									<header className="app_header">
										<a className="product_logo_wrap" href="/">
												<span className="rightscale_logo"></span>
										</a>
										<div className="export_link">
										<span className="button default small" data-placement="bottom" ng-click="openExport()">
											<span className="text">Export all data</span>
										</span>
										</div>
									</header>
									<section className="clouds-wrapper" ng-class="{'filters-visible': filters_visible}">
										<section className="clouds">
											<table>
												<thead>
												<tr>
													<th className="filter-features">
														<div className="logo"></div>
														<span className="button secondary subscribe">Subscribe to Updates</span>
													</th>

													{main.vendors.map(vendor => {
														let perc = 0;
														if(vendor._total&&main.total) perc = parseInt(vendor._total / main.total * 100);
														let style = {
															'background': 'linear-gradient(90deg, rgba(128, 193, 26, 0.9) 0%, rgba(128, 193, 26, 0.95) ' + perc + '%, rgba(244, 245, 247, 0.5) ' + perc + '%)'
														}
														return (
															<th className={vendor.short_name}>
																<div className="logo">
																		<img src={'/' + vendor.logo} alt={vendor.short_name}></img>
																</div>

																{main.clean && (
																<div className="score">
																	<span className="nga-fast nga-collapse nga-stagger-slow">
																		<span className="fraction">
																			<strong>{vendor._total}</strong> of <strong>{main.total} </strong>
																			<span className="desc-text">filters match</span>
																		</span>
																	</span>
																	<div className="percentage-bar" style={style}></div>
																</div>
																)}
															</th>
														)
													})}

												</tr>
												</thead>
												<tbody ng-class="{'filters-selected': total_selected_filters > 0}">

												{main.sections_fields.map(field => {
														return (
																<Section field={field} sections={main.sections[field]} refresh={this.refresh}/>
														)
												})}

												</tbody>
											</table>
										</section>
										<section className="footer">
										<span className="footer-legal">
											&copy; 2016-2018 RightScale, Inc.
										</span>
																	<span className="last-updated">
											Last updated: 2018/08/20
										</span>
										</section>
									</section>
									<section className="filter">
											<span ng-click="openHelp()" className="help-button"></span>
											<span ng-click="openCopy()" className="copyright-button"></span>
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
																		let perc = 0;
																		if(vendor._total&&main.total) perc = parseInt(vendor._total / main.total * 100);
																		let style = {
																			'background': 'linear-gradient(90deg, rgba(128, 193, 26, 0.9) 0%, rgba(128, 193, 26, 0.95) ' + perc + '%, rgba(244, 245, 247, 0.5) ' + perc + '%)'
																		}
																		return (
																			<th className={vendor.short_name + ' checked'}>
																				<div className="logo">
																						<img src={'/' + vendor.logo_mobile} alt={vendor.short_name}></img>
																				</div>
																				{main.clean && (
																				<div className="score">
																					<span className="nga-fast nga-collapse nga-stagger-slow">
																						<span className="fraction">
																							<strong>{vendor._total}</strong> of <strong>{main.total} </strong>
																							<span className="desc-text">filters match</span>
																						</span>
																					</span>
																					<div className="percentage-bar" style={style}></div>
																				</div>
																				)}
																			</th>
																		)
																})}
														</tr>
														</thead>
														<tbody ng-class="{'filters-selected': total_selected_filters > 0}">

														{main.sections_fields.map(field => {
															return (
																<Section field={field} sections={main.sections[field]} refresh={this.refresh}/>
															)
														})}

														</tbody>

												</table>
										</section>
								</section>
								<section className="sidebar" ng-controller="FilterOptionsController">
									<div className="sidebar--batch-action">
										{/*<span className="expand" onClick="expandAll" ng-class="{'expanded': isExpanded()}">
											<img src="images/icon-chevron-white.svg"><span>|isExpanded() ? 'Collapse All' : 'Expand All'|</span>
										<span className="clear" ng-show="hasAnySelectedFilters()" ng-click="clearAll()">Clear All</span>*/}
									</div>
								
									{/*<mField index={index} section={section} refresh={this.refresh}>{field}</mField>*/}

								{main.sections_fields.map(field => {
									main.sections[field].map((section, index) => {
										console.log(section);
										return (
											<div>{section.label}</div>
									)});
								})}

								</section>
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
