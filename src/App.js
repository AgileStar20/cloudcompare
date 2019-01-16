import React, {Component} from 'react';
import Section from './components/section';
import main from './services/main';
import {confirmAlert} from "react-confirm-alert";
import {CSVLink} from "react-csv";
import $ from 'jquery'

class App extends Component {
	constructor(props) {
		super(props);
		this.clean = this.clean.bind(this);
		this.refresh = this.refresh.bind(this);
		this.toggle = this.toggle.bind(this);
		this.mtoggle = this.mtoggle.bind(this);
		this.toggleAll = this.toggleAll.bind(this);
		this.openHelp = this.openHelp.bind(this);
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

	expanded = true;

	toggleAll() {
		this.expanded = !this.expanded;
		for (let each in this.show) {
			this.show[each] = this.expanded;
		}
		this.refresh();
	}

	show = {};

	mtoggle(sindex, index) {
		this.show[sindex + '' + index] = !this.show[sindex + '' + index];
		this.refresh();
	}

	toggle(field, e, i) {
		main.checkboxes[field + i] = !main.checkboxes[field + i];
		main.toggle();
		this.refresh();
	}

	openHelp() {
		confirmAlert({
			customUI: ({onClose}) => {
				return (
					<section className="ngdialog-message">
						<section className="modal--wrapper">
							<h1 className="modal--title">What Is RightScale Cloud Comparison?</h1>
							<div className="modal--content">
								<div className="modal--content-text">
									<p>Cloud Comparison is a free tool that enables you to compare features across the leading public clouds. Simply select your requirements to determine which cloud best fits your needs.</p>
									<p>To provide feedback or for questions, <a href="http://www.rightscale.com/contact" target="_new">contact us</a>.</p>
									<p>For more info, see <a href="http://docs.rightscale.com/ca/cloud_comp/ca_getting_started_with_cloud_comparison.html" target="_new">documentation</a>.</p>
								</div>
							</div>
							<div className="modal--footer">
								<div className="action-bar">
									<button className="secondary" onClick={() => {
										onClose()
									}}>Continue to Cloud Comparison
									</button>
								</div>
							</div>
						</section>
					</section>
				);
			}
		});
	}

	subscribe = () => {
		let email;

		const confirm = (e) => {
			e.preventDefault();
			/*
			* email: ms-vin@ya.ru
				CloudCompare_Subscribe: false
				CCRecipients:
				elqSiteID: 2391
				elqFormName: Cloud-Comparison-Tool-Subscribe
				form_url: Cloud-Comparison-Tool-Subscribe
				FileName: rightscale-cloud-comparison-data.csv
				EmailMessage:
				LeadSource:
				company: No Company Given
				Source_Detail__c:
				SFDC_Campaign_ID__c:
				SFDC_Campaign_Status__c:
				Web_Form_URL__c: http://www.rightscale.com/cloud-comparison-tool/email-all-data
				Assignment_Guidance__c: All
				Partner_Source__c:
				RecordTypeId: 012700000005loFAAQ
				FormName: Contact_Us
				Offer_Source__c: Cloud Compare - Report
				QueryParameters: query_parameters
				_mkt_trk: _mkt_trk
				asset_label: Subscribe to Cloud Comparison Updates
				listenloop: Subscribed to CC updates
			* */
			let formData = new FormData();
			formData.append('email', email);
			formData.append('CloudCompare_Subscribe', false);
			formData.append('CCRecipients', '');
			formData.append('elqSiteID', 2391);
			formData.append('elqFormName', 'Cloud-Comparison-Tool-Subscribe');
			formData.append('form_url', 'Cloud-Comparison-Tool-Subscribe');
			formData.append('company', 'No Company Given');
			formData.append('Web_Form_URL__c', 'http://www.rightscale.com/cloud-comparison-tool/email-all-data');
			formData.append('Assignment_Guidance__c', 'All');
			formData.append('RecordTypeId', '012700000005loFAAQ');
			formData.append('FormName', 'Contact_Us');
			formData.append('Offer_Source__c', 'Cloud Compare - Report');
			formData.append('asset_label', 'Subscribe to Cloud Comparison Updates');
			formData.append('listenloop', 'Subscribed to CC updates');
			$.ajax({
				type: "POST",
				url: "https://s2391.t.eloqua.com/e/f2",
				data: formData,
				processData: false,
				contentType: false,
			});
		};

		const changeEmail = (e) => {
			email = e.target.value;
		};

		confirmAlert({
			customUI: ({onClose}) => {
				return (
					<div className="ngdialog-content" style={{
						position: 'relative'
					}}>
						<section className="ngdialog-message">
							<section className="modal--wrapper">
								<h1 className="modal--title">Sign Me Up for Updates</h1>
								<div className="modal--content">
									<div className="modal--content-text">
										<p>We'll send you information on new cloud provider services and new Cloud Comparison features (1-3x per quarter).</p>
										<form className="signup-form marketo subscribe-form" acceptCharset="UTF-8" name="contact_form" id="sign_up_form" onSubmit={(e) => {
											confirm(e);
											onClose();
										}}>
											<input id="email" name="email" type="email" placeholder="Business Email" value={email} className="subscribe-email required" title="Please enter a valid email address." onChange={(e) => {
												changeEmail(e)
											}} required/>
											<div id="form_message" className="hidden message"></div>
											<button type="submit" className="subscribe-button">Subscribe</button>
										</form>
									</div>
								</div>
							</section>
						</section>
						<div className="ngdialog-close" style={{
							cursor: 'pointer',
							position: 'absolute',
							right: '9px',
							top: '-5px',
							fontSize: '24px'
						}} onClick={() => {
							onClose()
						}}></div>
					</div>
				);
			}
		});
	}

	exportAll = () => {
		let data = main.exportAllData();
		const csvHeaders = main.getCsvHeaders();
		let email, recipients;

		const confirm = (e) => {
			// e.preventDefault();
			let formData = new FormData();
			formData.append('email', email);
			formData.append('CloudCompare_Subscribe', false);
			formData.append('CCRecipients', '');
			formData.append('elqSiteID', 2391);
			formData.append('elqFormName', 'Cloud-Comparison-Tool-Subscribe');
			formData.append('form_url', 'Cloud-Comparison-Tool-Subscribe');
			formData.append('company', 'No Company Given');
			formData.append('Web_Form_URL__c', 'http://www.rightscale.com/cloud-comparison-tool/email-selected-data');
			formData.append('Assignment_Guidance__c', 'All');
			formData.append('RecordTypeId', '012700000005loFAAQ');
			formData.append('FormName', 'Contact_Us');
			formData.append('Offer_Source__c', 'Cloud Compare - Report');
			formData.append('asset_label', 'Subscribe to Cloud Comparison Updates');
			formData.append('listenloop', 'Subscribed to CC updates');
			$.ajax({
				type: "POST",
				url: "https://s2391.t.eloqua.com/e/f2",
				data: formData,
				processData: false,
				contentType: false,
			});
		}

		const changeSta = (e) => {
			let offerSource = document.getElementById('Offer_Source__c');
			if (e.target.checked) {
				offerSource.value = "Cloud Compare";
			} else {
				offerSource.value = "Cloud Compare - Report";
			}
		}

		const changeEmail = (e) => {
			email = e.target.value;
		}

		const changeRecipients = (e) => {
			recipients = e.target.value;
		}

		confirmAlert({
			customUI: ({onClose}) => {
				return (
					<div className="ngdialog-content" style={{
						position: 'relative'
					}}>
						<section className="ngdialog-message">
							<section className="modal--wrapper">
								<h1 className="modal--title">Send Me Cloud Comparison Data</h1>
								<div className="modal--content">
									<div className="modal--content-text">
										<p>Please provide an email address for sending the exported data in CSV form.</p>
										<form className="signup-form marketo subscribe-form export-form all-export" acceptCharset="UTF-8" name="export_form" id="sign_up_form">
											<input id="email" name="email" type="email" placeholder="Business Email" value={email} className="subscribe-email" title="Please enter a valid email address." onChange={(e) => {
												changeEmail(e)
											}} required/>
											<div className="check-detail">
												<input type="checkbox" name="CloudCompare_Subscribe" id="CloudCompare_Subscribe" value="false" onChange={(e) => {
													changeSta(e)
												}}/>
												<label for="CloudCompare_Subscribe">Opt me in to Cloud Comparison Quarterly Updates
													<a ng-hide="share_link_generated" data-tooltip="We'll send you information on new cloud provider services and new Cloud Comparison features (1-3x per quarter)." data-placement="bottom"><img
														src="../images/icon-help-grey.png"/></a>
												</label>
											</div>
											<input name="CCRecipients" id="CCRecipients" className="subscribe-email" type="text" placeholder="Additional Recipients (comma separated)" value={recipients} onChange={(e) => {
												changeRecipients(e)
											}}/>
											<div id="form_message" className="hidden message"></div>
											<CSVLink data={data} headers={csvHeaders} filename={"rightscale-cloud-comparison-data.csv"}>
												<button type="button" onClick={(e) => {
													confirm(e);
													onClose();
												}} className="subscribe-button multiple-subscribe">Subscribe</button>
											</CSVLink>
										</form>
									</div>
								</div>
							</section>
						</section>
						<div className="ngdialog-close" style={{
							cursor: 'pointer',
							position: 'absolute',
							right: '9px',
							top: '-5px',
							fontSize: '24px'
						}} onClick={() => {
							onClose()
						}}></div>
					</div>
				);
			}
		});
	}

	exportSelected = () => {
		let data = main.exportSelectedData();
		const csvHeaders = main.getCsvHeaders();
		let email, recipients;

		const confirm = (e) => {
			let formData = new FormData();
			formData.append('email', email);
			formData.append('CloudCompare_Subscribe', false);
			formData.append('CCRecipients', '');
			formData.append('elqSiteID', 2391);
			formData.append('elqFormName', 'Cloud-Comparison-Tool-Subscribe');
			formData.append('form_url', 'Cloud-Comparison-Tool-Subscribe');
			formData.append('company', 'No Company Given');
			formData.append('Web_Form_URL__c', 'http://www.rightscale.com/cloud-comparison-tool/email-selected-data');
			formData.append('Assignment_Guidance__c', 'All');
			formData.append('RecordTypeId', '012700000005loFAAQ');
			formData.append('FormName', 'Contact_Us');
			formData.append('Offer_Source__c', 'Cloud Compare - Report');
			formData.append('asset_label', 'Subscribe to Cloud Comparison Updates');
			formData.append('listenloop', 'Subscribed to CC updates');
			$.ajax({
				type: "POST",
				url: "https://s2391.t.eloqua.com/e/f2",
				data: formData,
				processData: false,
				contentType: false,
			});
		}

		const changeSta = (e) => {
			let offerSource = document.getElementById('Offer_Source__c');
			if (e.target.checked) {
				offerSource.value = "Cloud Compare";
			} else {
				offerSource.value = "Cloud Compare - Report";
			}
		}

		const changeEmail = (e) => {
			email = e.target.value;
		}

		const changeRecipients = (e) => {
			recipients = e.target.value;
		}

		confirmAlert({
			customUI: ({onClose}) => {
				return (
					<div className="ngdialog-content" style={{
						position: 'relative'
					}}>
						<section className="ngdialog-message">
							<section className="modal--wrapper">
								<h1 className="modal--title">Send Me Cloud Comparison Data</h1>
								<div className="modal--content">
									<div className="modal--content-text">
										<p>Please provide an email address for sending the exported data in CSV form.</p>
										<form className="signup-form marketo subscribe-form export-form selected-export" acceptCharset="UTF-8" name="export_form" id="sign_up_form" >
											<input id="email" name="email" type="email" placeholder="Business Email" value={email} className="subscribe-email" title="Please enter a valid email address." onChange={(e) => {
												changeEmail(e)
											}} required/>
											<div className="check-detail">
												<input type="checkbox" name="CloudCompare_Subscribe" id="CloudCompare_Subscribe" value="false" onChange={(e) => {
													changeSta(e)
												}}/>
												<label for="CloudCompare_Subscribe">Opt me in to Cloud Comparison Quarterly Updates
													<a ng-hide="share_link_generated" data-tooltip="We'll send you information on new cloud provider services and new Cloud Comparison features (1-3x per quarter)." data-placement="bottom"><img
														src="../images/icon-help-grey.png"/></a>
												</label>
											</div>
											<input name="CCRecipients" id="CCRecipients" className="subscribe-email" type="text" placeholder="Additional Recipients (comma separated)" value={recipients} onChange={(e) => {
												changeRecipients(e)
											}}/>
											<div id="form_message" className="hidden message"></div>
											<CSVLink data={data} headers={csvHeaders} filename={"rightscale-cloud-comparison-data.csv"}>
												<button type="button" onClick={(e) => {
													confirm(e);
													onClose();
												}} className="subscribe-button multiple-subscribe">Subscribe</button>
											</CSVLink>
										</form>
									</div>
								</div>
							</section>
						</section>
						<div className="ngdialog-close" style={{
							cursor: 'pointer',
							position: 'absolute',
							right: '9px',
							top: '-5px',
							fontSize: '24px'
						}} onClick={() => {
							onClose()
						}}></div>
					</div>
				);
			}
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
                                            <span className="button default small" data-placement="bottom" onClick={this.exportAll}>
                                                <span className="text">Export all data</span>
                                            </span>
							</div>
							{main.total > 0 && <div className="export_link">
								<a onClick={this.exportSelected} className="share_button button default small" data-placement="bottom">
									<span className="text">Export selected</span>
								</a>
							</div>
							}
						</header>
						<section className="clouds-wrapper filters-visible">
							<section className="clouds">
								<table>
									<thead>
									<tr>
										<th className="filter-features">
											<div className="logo"></div>
											<span className="button secondary subscribe" onClick={this.subscribe}>Subscribe to Updates</span>
										</th>

										{main.vendors.map(vendor => {
											let perc = 0;
											if (vendor._total && main.total) perc = parseInt(vendor._total / main.total * 100);
											let style = {
												'background': 'linear-gradient(90deg, rgba(128, 193, 26, 0.9) 0%, rgba(128, 193, 26, 0.95) ' + perc + '%, rgba(244, 245, 247, 0.5) ' + perc + '%)'
											}
											return (
												<th key={vendor.short_name} className={vendor.short_name}>
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
									<tbody className={main.total > 0 ? 'filters-selected' : ''}>

									{main.sections_fields.map((field, key) => {
										return (
											<Section key={key} field={field} sections={main.sections[field]} refresh={this.refresh}/>
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
							<span onClick={this.openHelp} className="help-button"></span>
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
							<div className="export_link">
								<a onClick={this.exportAll} className="button default small" data-placement="bottom">
									<span className="text">Export all data</span>
								</a>
							</div>
							{main.total > 0 && <div className="export_link">
								<a onClick={this.exportSelected} className="share_button button default small" data-placement="bottom">
									<span className="text">Export selected</span>
								</a>
							</div>}
							<span onClick={this.openHelp} className="help-button"></span>
						</header>
						<section className="clouds-wrapper filters-visible">
							<section className="clouds">
								<table>
									<thead>
									<tr>
										{main.vendors.map(vendor => {
											let perc = 0;
											if (vendor._total && main.total) perc = parseInt(vendor._total / main.total * 100);
											let style = {
												'background': 'linear-gradient(90deg, rgba(128, 193, 26, 0.9) 0%, rgba(128, 193, 26, 0.95) ' + perc + '%, rgba(244, 245, 247, 0.5) ' + perc + '%)'
											}
											return (
												<th key={vendor.short_name} className={vendor.short_name + ' checked'}>
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
								</table>
							</section>
						</section>
						<section className="sidebar">
							<div className="sidebar--batch-action">
									<span className={"expand" + (this.expanded && ' expanded' || '')} onClick={this.toggleAll}>
										<img src="/images/icon-chevron-white.svg"/>
										<span>{this.expanded && 'Collapse All' || 'Expand All'}</span>
									</span>
								{main.clean && (
									<span className="clear" onClick={this.clean}>Clear All</span>
								)}
							</div>
							{main.sections_fields.map((field, sindex) => {
								return main.sections[field].map((section, index) => {
									if (typeof this.show[sindex + '' + index] != 'boolean') this.show[sindex + '' + index] = true;
									let classAdded = "sidebar--title mobile";
									if (this.show[sindex + '' + index]) classAdded += ' expanded';
									else classAdded += ' collapsed';
									return (
										<section key={section.key} className="sidebar--filter">
												<span className={classAdded} onClick={e => {
													this.mtoggle(sindex, index)
												}}>
													<span>{section.label}</span>
												</span>
											{this.show[sindex + '' + index] && (
												<ul className="sidebar--list">
													{main.options.find((opt) => {
														return opt.key === section.key
													}).values.map((value, i) => {
														return (
															<li key={+section.key + '-' + i} className={"sidebar--option " + section.key + '-' + i + (main.checkboxes[section.key + '-' + i] && ' checked' || '')}>
																<label className="checkbox_wrap">
																	<input type="checkbox" checked={main.checkboxes[section.key + '-' + i] || false} onChange={e => {
																		this.toggle(section.key + '-', e, i)
																	}}/>
																	<span className="checkbox_label">{value}</span>
																</label>
															</li>
														)
													})}
												</ul>
											)}
										</section>
									)
								});
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
