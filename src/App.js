import React, {Component} from 'react';
import Section from './components/section';
import main from './services/main';
import {confirmAlert} from "react-confirm-alert";
import { CSVLink } from "react-csv";
import $ from 'jquery'
import _ from 'lodash'
import FormHandler from './services/customForm'

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
	// Events
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
	toggleAll(){
		this.expanded = !this.expanded;
		for(let each in this.show){
			this.show[each] = this.expanded;
		}
		this.refresh();
	}
	show = {};
	mtoggle(sindex, index) {
		this.show[sindex+''+index] = !this.show[sindex+''+index];
		this.refresh();
	}
	toggle(field, e, i){
		main.checkboxes[field+i]=!main.checkboxes[field+i];
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
                                        }}>Continue to Cloud Comparison</button>
                                    </div>
                                </div>
                            </section>
                        </section>
                );
            }
        });
    }

	saveForm = (fields, form) => {
		$(FormHandler.send_marketing_data(fields, form, FormHandler.handle_marketing_response));
	}

	subscribe = () => {
		let email;

		const confirm = (e) => {
			// // Setting cookie to hide subscribe once filled out form
			// $cookies.put('cloud_compare_subscribe', 'true', {
			// 	'expires': 'Tue, 19 Jan 2038 03:14:07 UTC'
			// });
			//
			// $scope.show_subscribe = false;
			e.preventDefault();

			let fields_to_gather = [];
			let form = $("form");

			form.find("input").map(function (i, field) {
				if (field.type.match(/text|email|tel|hidden|radio|checkbox/)) {
					fields_to_gather.push(field.name);
				}
			});
			form.find("select").map(function (i, field) {
				fields_to_gather.push(field.name);
			});

			this.saveForm(fields_to_gather, form);
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
										<form className="signup-form marketo subscribe-form" acceptCharset="UTF-8" name="contact_form" id="sign_up_form" onSubmit={(e)=> {confirm(e); onClose(); }}>
											<input id="email" name="email" type="email" placeholder="Business Email" value={email} className="subscribe-email required" title="Please enter a valid email address." onChange={(e) => { changeEmail(e)}} required />
												<div id="form_message" className="hidden message"></div>
												<button type="submit" className="subscribe-button">Subscribe</button>
												<ul>
													<li style={{display: 'none'}}>
														<label htmlFor="elqSiteID">elqSiteID</label>
														<input type="hidden" ng-model="fields_to_gather.elqSiteID" name="elqSiteID" id="elqSiteID" value="2391"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="elqFormName">elqFormName</label>
														<input type="hidden" ng-model="fields_to_gather.elqFormName" name="elqFormName" id="elqFormName" value="Cloud-Comparison-Tool-Subscribe"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="form_url">form_url</label>
														<input type="hidden" ng-model="fields_to_gather.form_url" name="form_url" id="form_url" value="Cloud-Comparison-Tool-Subscribe"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="FileName">File Name:</label>
														<input name="FileName" id="FileName" ng-model="fields_to_gather.FileName" type="hidden" value="rightscale-cloud-comparison-data.csv"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="EmailMessage">Email Message:</label>
														<input name="EmailMessage" id="EmailMessage" ng-model="fields_to_gather.EmailMessage" type="hidden" value=""/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="LeadSource">Lead Source:</label>
														<input name="LeadSource" id="LeadSource" ng-model="fields_to_gather.LeadSource" type="hidden" value=""/>
													</li>
													<li style={{display: 'none'}}>
														<label>Company:</label>
														<input name="company" ng-model="fields_to_gather.company" id="company" type="hidden" value="No Company Given"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="Source_Detail__c">Source Detail:</label>
														<input name="Source_Detail__c" ng-model="fields_to_gather.Source_Detail__c" id="Source_Detail__c" type="hidden" value=""/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="SFDC_Campaign_ID__c">SFDC Campaign ID:</label>
														<input name="SFDC_Campaign_ID__c" ng-model="fields_to_gather.SFDC_Campaign_ID__c" id="SFDC_Campaign_ID__c" type="hidden" value=""/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="SFDC_Campaign_Status__c">SFDC Campaign Status:</label>
														<input name="SFDC_Campaign_Status__c" ng-model="fields_to_gather.SFDC_Campaign_Status__c" id="SFDC_Campaign_Status__c" type="hidden" value=""/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="Web_Form_URL__c">Web Form URL:</label>
														<input name="Web_Form_URL__c" ng-model="fields_to_gather.Web_Form_URL__c" id="Web_Form_URL__c" type="hidden" value="http://www.rightscale.com/cloud-comparison-tool/email-all-data"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="Assignment_Guidance__c">Assignment Category:</label>
														<input name="Assignment_Guidance__c" ng-model="fields_to_gather.Assignment_Guidance__c" id="Assignment_Guidance__c" type="hidden" value="All"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="Partner_Source__c">Partner Source:</label>
														<input name="Partner_Source__c" ng-model="fields_to_gather.Partner_Source__c" id="Partner_Source__c" type="hidden" value=""/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="RecordTypeId">RecordTypeId:</label>
														<input name="RecordTypeId" ng-model="fields_to_gather.RecordTypeId" id="RecordTypeId" type="hidden" value="012700000005loFAAQ"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="FormName">Form Name:</label>
														<input name="FormName" ng-model="fields_to_gather.FormName" id="FormName" type="hidden" value="Contact_Us"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="Offer_Source__c">Offer Source:</label>
														<input name="Offer_Source__c" ng-model="fields_to_gather.Offer_Source__c" id="Offer_Source__c" type="hidden" value="Cloud Compare - Report"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="QueryParameters">Query Parameters</label>
														<input type="hidden" ng-model="fields_to_gather.QueryParameters" name="QueryParameters" id="QueryParameters" value="query_parameters"/>
													</li>
													<li style={{display: 'none'}}>
														<label htmlFor="_mkt_trk">_mkt_trk</label>
														<input type="hidden" ng-model="fields_to_gather._mkt_trk" name="_mkt_trk" id="_mkt_trk" value="_mkt_trk"/>
													</li>
													<input name="asset_label" ng-model="fields_to_gather.asset_label" id="asset_label" type="hidden" value="Subscribe to Cloud Comparison Updates"/>
													<input name="listenloop" ng-model="fields_to_gather.listenloop" id="listenloop" type="hidden" value="Subscribed to CC updates"/>
												</ul>
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
        let data = [];
        let email, recipients;

        for (var category in main.vendors[0]) {
            var currentCategory = main.vendors[0][category];
            switch(category) {
                case "vm_sizes":
                    var section = "Basic";
                    var mainCategory = "VM Sizes";
                    break;
                case "sla_terms":
                    var section = "Basic";
                    var mainCategory = "SLA Terms";
                    break;
                case "certifications":
                    var section = "Basic";
                    var mainCategory = "Certifications";
                    break;
                case "operating_systems":
                    var section = "Basic";
                    var mainCategory = "Operating Systems";
                    break;
                case "regions":
                    var section = "Basic";
                    var mainCategory = "Regions";
                    break;
                case "countries":
                    var section = "Basic";
                    var mainCategory = "Countries";
                    break;
                case "compute_services":
                    var section = "Core Services";
                    var mainCategory = "Compute Services";
                    break;
                case "network_services":
                    var section = "Core Services";
                    var mainCategory = "Network Services";
                    break;
                case "storage_services":
                    var section = "Core Services";
                    var mainCategory = "Storage Services";
                    break;
                case "relational_dbs":
                    var section = "Database Services";
                    var mainCategory = "Relational Databases";
                    break;
                case "nonrelational_dbs":
                    var section = "Database Services";
                    var mainCategory = "Non_Relational Databases";
                    break;
                case "other_dbs":
                    var section = "Database Services";
                    var mainCategory = "Other DBaaS";
                    break;
                case "data_analytics_services":
                    var section = "Additional Services";
                    var mainCategory = "Data & Analytics Services";
                    break;
                case "ai_machine_learning":
                    var section = "Additional Services";
                    var mainCategory = "AI and Machine Learning";
                    break;
                case "application_services":
                    var section = "Additional Services";
                    var mainCategory = "Application Services";
                    break;
                case "security_identity":
                    var section = "Additional Services";
                    var mainCategory = "Security & Identity";
                    break;
                default:
                    var section = "N/A";
                    var mainCategory = "N/A";
            }

            if (currentCategory instanceof Array === false) {
                continue;
            }
            for (var i = 0; i < currentCategory.length; ++i) {
                var service = { Section: section, Category: mainCategory, Feature: currentCategory[i].name };
                for (var j = 0; j < main.vendors.length; ++j) {
                    service[main.vendors[j].name] = main.vendors[j][category][i].display;
                    if (main.vendors[j][category][i].url !== "multi") {
                        service[main.vendors[j].short_name] = main.vendors[j][category][i].url;
                    } else if (main.vendors[j][category][i].url === "multi") {
                        service[main.vendors[j].short_name] = main.vendors[j][category][i].multiurl;
                    }
                }
                data.push(service);
            }
        }

        const csvHeaders = [
            { label: 'Section', key: 'Section' },
            { label: 'Category', key: 'Category' },
            { label: 'Feature', key: 'Feature' },
            { label: 'AWS', key: 'Amazon Web Services' },
            { label: 'AWS URL', key: 'aws' },
            { label: 'Azure', key: 'Microsoft Azure' },
            { label: 'Azure URL', key: 'azure' },
            { label: 'Google', key: 'Google Cloud Platform' },
            { label: 'Google URL', key: 'google' },
            { label: 'IBM', key: 'IBM Cloud' },
            { label: 'IBM URL', key: 'ibm' }];

        const confirm = (e) => {
	        e.preventDefault();
	        // // Setting cookie to hide subscribe once filled out form
	        // $cookies.put('cloud_compare_subscribe', 'true', {
		    //     'expires': 'Tue, 19 Jan 2038 03:14:07 UTC'
	        // });
	        //
	        // $scope.show_subscribe = false;

	        let fields_to_gather = [];
	        var form = $("form");

	        form.find("input").map(function (i, field) {
		        if (field.type.match(/text|email|tel|hidden|radio|checkbox/)) {
			        fields_to_gather.push(field.name);
		        }
	        });
	        form.find("select").map(function (i, field) {
		        fields_to_gather.push(field.name);
	        });


	        var form = $("form");
	        this.saveForm(fields_to_gather, form);
        }

        const changeSta = (e) => {
	        let offerSource = document.getElementById('Offer_Source__c');
	        if(e.target.checked) {
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
                                            <form className="signup-form marketo subscribe-form export-form all-export" acceptCharset="UTF-8" name="export_form" id="sign_up_form" onSubmit={(e)=> {confirm(e); onClose();}}>
                                                <input id="email" name="email" type="email" placeholder="Business Email" value={email} className="subscribe-email" title="Please enter a valid email address." onChange={(e) => { changeEmail(e)}} required />
                                                    <div className="check-detail">
                                                        <input type="checkbox" name="CloudCompare_Subscribe" id="CloudCompare_Subscribe" value="false" onChange={(e) => { changeSta(e)}} />
                                                        <label for="CloudCompare_Subscribe">Opt me in to Cloud Comparison Quarterly Updates
                                                            <a ng-hide="share_link_generated" data-tooltip="We'll send you information on new cloud provider services and new Cloud Comparison features (1-3x per quarter)." data-placement="bottom"><img src="../images/icon-help-grey.png" /></a>
                                                        </label>
                                                    </div>
                                                    <input name="CCRecipients" id="CCRecipients" className="subscribe-email" type="text" placeholder="Additional Recipients (comma separated)" value={recipients} onChange={(e) => { changeRecipients(e)}} />
                                                     <div id="form_message" className="hidden message"></div>
                                                    <CSVLink data={data} headers={csvHeaders}  filename={"rightscale-cloud-comparison-data.csv"}>
                                                        <button type="submit" className="subscribe-button multiple-subscribe">Subscribe</button>
                                                    </CSVLink>
                                                    <ul>
                                                        <li style={{display: 'none'}}>
                                                            <label for="elqSiteID">elqSiteID</label>
                                                            <input type="hidden" ng-model="fields_to_gather.elqSiteID" name="elqSiteID" id="elqSiteID" value="2391" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="elqFormName">elqFormName</label>
                                                            <input type="hidden" ng-model="fields_to_gather.elqFormName" name="elqFormName" id="elqFormName" value="Cloud-Comparison-Tool-Subscribe" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="form_url">form_url</label>
                                                            <input type="hidden" ng-model="fields_to_gather.form_url" name="form_url" id="form_url" value="Cloud-Comparison-Tool-Subscribe" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="FileName">File Name:</label>
                                                            <input name="FileName" id="FileName" ng-model="fields_to_gather.FileName" type="hidden" value="rightscale-cloud-comparison-data.csv" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="EmailMessage">Email Message:</label>
                                                            <input name="EmailMessage" id="EmailMessage" ng-model="fields_to_gather.EmailMessage" type="hidden" value="" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="LeadSource">Lead Source:</label>
                                                            <input name="LeadSource" id="LeadSource" ng-model="fields_to_gather.LeadSource" type="hidden" value="" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label>Company:</label>
                                                            <input name="company" ng-model="fields_to_gather.company" id="company" type="hidden" value="No Company Given" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="Source_Detail__c">Source Detail:</label>
                                                            <input name="Source_Detail__c" ng-model="fields_to_gather.Source_Detail__c" id="Source_Detail__c" type="hidden" value="" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="SFDC_Campaign_ID__c">SFDC Campaign ID:</label>
                                                            <input name="SFDC_Campaign_ID__c" ng-model="fields_to_gather.SFDC_Campaign_ID__c" id="SFDC_Campaign_ID__c" type="hidden" value="" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="SFDC_Campaign_Status__c">SFDC Campaign Status:</label>
                                                            <input name="SFDC_Campaign_Status__c" ng-model="fields_to_gather.SFDC_Campaign_Status__c" id="SFDC_Campaign_Status__c" type="hidden" value="" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="Web_Form_URL__c">Web Form URL:</label>
                                                            <input name="Web_Form_URL__c" ng-model="fields_to_gather.Web_Form_URL__c" id="Web_Form_URL__c" type="hidden" value="http://www.rightscale.com/cloud-comparison-tool/email-all-data" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="Assignment_Guidance__c">Assignment Category:</label>
                                                            <input name="Assignment_Guidance__c" ng-model="fields_to_gather.Assignment_Guidance__c" id="Assignment_Guidance__c" type="hidden" value="All" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="Partner_Source__c">Partner Source:</label>
                                                            <input name="Partner_Source__c" ng-model="fields_to_gather.Partner_Source__c" id="Partner_Source__c" type="hidden" value="" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="RecordTypeId">RecordTypeId:</label>
                                                            <input name="RecordTypeId" ng-model="fields_to_gather.RecordTypeId" id="RecordTypeId" type="hidden" value="012700000005loFAAQ" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="FormName">Form Name:</label>
                                                            <input name="FormName" ng-model="fields_to_gather.FormName" id="FormName" type="hidden" value="Contact_Us" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="Offer_Source__c">Offer Source:</label>
                                                            <input name="Offer_Source__c" ng-model="fields_to_gather.Offer_Source__c" id="Offer_Source__c" type="hidden" value="Cloud Compare - Report" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="QueryParameters">Query Parameters</label>
                                                            <input type="hidden" ng-model="fields_to_gather.QueryParameters" name="QueryParameters" id="QueryParameters" value="query_parameters" />
                                                        </li>
                                                        <li style={{display: 'none'}}>
                                                            <label for="_mkt_trk">_mkt_trk</label>
                                                            <input type="hidden" ng-model="fields_to_gather._mkt_trk" name="_mkt_trk" id="_mkt_trk" value="_mkt_trk" />
                                                        </li>
                                                        <input name="asset_label" ng-model="fields_to_gather.asset_label" id="asset_label" type="hidden" value="Subscribe to Cloud Comparison Updates" />
                                                            <input name="listenloop" ng-model="fields_to_gather.listenloop" id="listenloop" type="hidden" value="Subscribed to CC updates" />
                                                    </ul>
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
	    let data = [];
	    let email, recipients;

	    let returnSelected = _(main.getSelectedFilters()).mapValues(function (values) {
		    return _(values).pickBy(_.identity).keys().value();
	    }).pickBy(function (value) {
		    return !_.isEmpty(value);
	    }).value();

	    const getServiceStateInClouds = (service) => {
		    var serviceStateObject = {};
		    serviceStateObject["Section"] = section;
		    serviceStateObject["Category"] = mainCategory;
		    serviceStateObject["Feature"] = service;
		    for (var i = 0; i <  main.vendors.length; ++i) {
			    var currentCloudService =  main.vendors[i];
			    for (var category in currentCloudService) {
				    for (var j = 0; j < currentCloudService[category].length; ++j) {
					    if (currentCloudService[category][j].name === service) {
						    serviceStateObject[currentCloudService.name] = currentCloudService[category][j].display;
						    if (currentCloudService[category][j].url !== "multi") {
							    serviceStateObject[currentCloudService.short_name] = currentCloudService[category][j].url;
						    } else if (currentCloudService[category][j].url === "multi") {
							    serviceStateObject[currentCloudService.short_name] = currentCloudService[category][j].multiurl;
						    }
					    }
				    }
			    }
		    }
		    return serviceStateObject;
	    }

	    for (let selectedFilter in returnSelected) {
		    switch(selectedFilter) {
			    case "vm_sizes":
				    var section = "Basic";
				    var mainCategory = "VM Sizes";
				    break;
			    case "sla_terms":
				    var section = "Basic";
				    var mainCategory = "SLA Terms";
				    break;
			    case "certifications":
				    var section = "Basic";
				    var mainCategory = "Certifications";
				    break;
			    case "operating_systems":
				    var section = "Basic";
				    var mainCategory = "Operating Systems";
				    break;
			    case "regions":
				    var section = "Basic";
				    var mainCategory = "Regions";
				    break;
			    case "countries":
				    var section = "Basic";
				    var mainCategory = "Countries";
				    break;
			    case "compute_services":
				    var section = "Core Services";
				    var mainCategory = "Compute Services";
				    break;
			    case "network_services":
				    var section = "Core Services";
				    var mainCategory = "Network Services";
				    break;
			    case "storage_services":
				    var section = "Core Services";
				    var mainCategory = "Storage Services";
				    break;
			    case "relational_dbs":
				    var section = "Database Services";
				    var mainCategory = "Relational Databases";
				    break;
			    case "nonrelational_dbs":
				    var section = "Database Services";
				    var mainCategory = "Non_Relational Databases";
				    break;
			    case "other_dbs":
				    var section = "Database Services";
				    var mainCategory = "Other DBaaS";
				    break;
			    case "data_analytics_services":
				    var section = "Additional Services";
				    var mainCategory = "Data & Analytics Services";
				    break;
			    case "application_services":
				    var section = "Additional Services";
				    var mainCategory = "Application Services";
				    break;
			    case "security_identity":
				    var section = "Additional Services";
				    var mainCategory = "Security & Identity";
				    break;
			    default:
				    var section = "N/A";
				    var mainCategory = "N/A";
		    }
		    for (var j = 0; j < returnSelected[selectedFilter].length; ++j) {
			    data.push(getServiceStateInClouds(returnSelected[selectedFilter][j]));
		    }
	    }

	    const csvHeaders = [
		    { label: 'Section', key: 'Section' },
		    { label: 'Category', key: 'Category' },
		    { label: 'Feature', key: 'Feature' },
		    { label: 'AWS', key: 'Amazon Web Services' },
		    { label: 'AWS URL', key: 'aws' },
		    { label: 'Azure', key: 'Microsoft Azure' },
		    { label: 'Azure URL', key: 'azure' },
		    { label: 'Google', key: 'Google Cloud Platform' },
		    { label: 'Google URL', key: 'google' },
		    { label: 'IBM', key: 'IBM Cloud' },
		    { label: 'IBM URL', key: 'ibm' }];

	    const confirm = (e) => {
		    e.preventDefault();
		    // // Setting cookie to hide subscribe once filled out form
		    // $cookies.put('cloud_compare_subscribe', 'true', {
		    //     'expires': 'Tue, 19 Jan 2038 03:14:07 UTC'
		    // });
		    //
		    // $scope.show_subscribe = false;

		    let fields_to_gather = [];
		    var form = $("form");

		    form.find("input").map(function (i, field) {
			    if (field.type.match(/text|email|tel|hidden|radio|checkbox/)) {
				    fields_to_gather.push(field.name);
			    }
		    });
		    form.find("select").map(function (i, field) {
			    fields_to_gather.push(field.name);
		    });


		    var form = $("form");
		    this.saveForm(fields_to_gather, form);
	    }

	    const changeSta = (e) => {
		    let offerSource = document.getElementById('Offer_Source__c');
		    if(e.target.checked) {
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
									    <form className="signup-form marketo subscribe-form export-form selected-export" acceptCharset="UTF-8" name="export_form" id="sign_up_form" onSubmit={(e)=> {confirm(e); onClose();}}>
										    <input id="email" name="email" type="email" placeholder="Business Email" value={email} className="subscribe-email" title="Please enter a valid email address." onChange={(e) => { changeEmail(e)}} required />
										    <div className="check-detail">
											    <input type="checkbox" name="CloudCompare_Subscribe" id="CloudCompare_Subscribe" value="false" onChange={(e) => { changeSta(e)}} />
											    <label for="CloudCompare_Subscribe">Opt me in to Cloud Comparison Quarterly Updates
												    <a ng-hide="share_link_generated" data-tooltip="We'll send you information on new cloud provider services and new Cloud Comparison features (1-3x per quarter)." data-placement="bottom"><img src="../images/icon-help-grey.png" /></a>
											    </label>
										    </div>
										    <input name="CCRecipients" id="CCRecipients" className="subscribe-email" type="text" placeholder="Additional Recipients (comma separated)" value={recipients} onChange={(e) => { changeRecipients(e)}} />
										    <div id="form_message" className="hidden message"></div>
										    <CSVLink data={data} headers={csvHeaders}  filename={"rightscale-cloud-comparison-data.csv"}>
											    <button type="submit" className="subscribe-button multiple-subscribe">Subscribe</button>
										    </CSVLink>
										    <ul>
											    <li style={{display: 'none'}}>
												    <label for="elqSiteID">elqSiteID</label>
												    <input type="hidden" ng-model="fields_to_gather.elqSiteID" name="elqSiteID" id="elqSiteID" value="2391" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="elqFormName">elqFormName</label>
												    <input type="hidden" ng-model="fields_to_gather.elqFormName" name="elqFormName" id="elqFormName" value="Cloud-Comparison-Tool-Subscribe" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="form_url">form_url</label>
												    <input type="hidden" ng-model="fields_to_gather.form_url" name="form_url" id="form_url" value="Cloud-Comparison-Tool-Subscribe" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="FileName">File Name:</label>
												    <input name="FileName" id="FileName" ng-model="fields_to_gather.FileName" type="hidden" value="rightscale-cloud-comparison-data.csv" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="EmailMessage">Email Message:</label>
												    <input name="EmailMessage" id="EmailMessage" ng-model="fields_to_gather.EmailMessage" type="hidden" value="" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="LeadSource">Lead Source:</label>
												    <input name="LeadSource" id="LeadSource" ng-model="fields_to_gather.LeadSource" type="hidden" value="" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label>Company:</label>
												    <input name="company" ng-model="fields_to_gather.company" id="company" type="hidden" value="No Company Given" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="Source_Detail__c">Source Detail:</label>
												    <input name="Source_Detail__c" ng-model="fields_to_gather.Source_Detail__c" id="Source_Detail__c" type="hidden" value="" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="SFDC_Campaign_ID__c">SFDC Campaign ID:</label>
												    <input name="SFDC_Campaign_ID__c" ng-model="fields_to_gather.SFDC_Campaign_ID__c" id="SFDC_Campaign_ID__c" type="hidden" value="" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="SFDC_Campaign_Status__c">SFDC Campaign Status:</label>
												    <input name="SFDC_Campaign_Status__c" ng-model="fields_to_gather.SFDC_Campaign_Status__c" id="SFDC_Campaign_Status__c" type="hidden" value="" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="Web_Form_URL__c">Web Form URL:</label>
												    <input name="Web_Form_URL__c" ng-model="fields_to_gather.Web_Form_URL__c" id="Web_Form_URL__c" type="hidden" value="http://www.rightscale.com/cloud-comparison-tool/email-selected-data" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="Assignment_Guidance__c">Assignment Category:</label>
												    <input name="Assignment_Guidance__c" ng-model="fields_to_gather.Assignment_Guidance__c" id="Assignment_Guidance__c" type="hidden" value="All" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="Partner_Source__c">Partner Source:</label>
												    <input name="Partner_Source__c" ng-model="fields_to_gather.Partner_Source__c" id="Partner_Source__c" type="hidden" value="" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="RecordTypeId">RecordTypeId:</label>
												    <input name="RecordTypeId" ng-model="fields_to_gather.RecordTypeId" id="RecordTypeId" type="hidden" value="012700000005loFAAQ" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="FormName">Form Name:</label>
												    <input name="FormName" ng-model="fields_to_gather.FormName" id="FormName" type="hidden" value="Contact_Us" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="Offer_Source__c">Offer Source:</label>
												    <input name="Offer_Source__c" ng-model="fields_to_gather.Offer_Source__c" id="Offer_Source__c" type="hidden" value="Cloud Compare - Report" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="QueryParameters">Query Parameters</label>
												    <input type="hidden" ng-model="fields_to_gather.QueryParameters" name="QueryParameters" id="QueryParameters" value="query_parameters" />
											    </li>
											    <li style={{display: 'none'}}>
												    <label for="_mkt_trk">_mkt_trk</label>
												    <input type="hidden" ng-model="fields_to_gather._mkt_trk" name="_mkt_trk" id="_mkt_trk" value="_mkt_trk" />
											    </li>
											    <input name="asset_label" ng-model="fields_to_gather.asset_label" id="asset_label" type="hidden" value="Subscribe to Cloud Comparison Updates" />
											    <input name="listenloop" ng-model="fields_to_gather.listenloop" id="listenloop" type="hidden" value="Subscribed to CC updates" />
										    </ul>
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
	// html
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
													if(vendor._total&&main.total) perc = parseInt(vendor._total / main.total * 100);
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
											<tbody className={ main.total > 0 ? 'filters-selected': ''}>

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
									</div> }
									<span onClick={this.openHelp} className="help-button"></span>
							</header>
							<section className="clouds-wrapper filters-visible">
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
													<tbody ng-class="{'filters-selected': total_selected_filters > 0}">

													{main.sections_fields.map((field, key) => {
														return (
															<Section key={key} field={field} sections={main.sections[field]} refresh={this.refresh}/>
														)
													})}

													</tbody>

											</table>
									</section>
							</section>
							<section className="sidebar">
								<div className="sidebar--batch-action">
									<span className={"expand"+(this.expanded&&' expanded'||'')} onClick={this.toggleAll}>
										<img src="/images/icon-chevron-white.svg" />
										<span>{this.expanded && 'Collapse All' || 'Expand All'}</span>
									</span>
									{main.clean && (
										<span className="clear" onClick={this.clean}>Clear All</span>
									)}
								</div>
								{main.sections_fields.map((field, sindex) => {
									return main.sections[field].map((section, index) => {
										if(typeof this.show[sindex+''+index] != 'boolean') this.show[sindex+''+index]=true;
										let classAdded = "sidebar--title mobile";
										if(this.show[sindex+''+index]) classAdded+=' expanded';
										else classAdded+=' collapsed';
										return (
											<section className="sidebar--filter">
												<span className={classAdded} onClick={e=>{this.mtoggle(sindex, index)}}>
													<span>{section.label}</span>
												</span>
								        { this.show[sindex+''+index] && (
													<ul className="sidebar--list">
														{main.options[index].values.map((value, i) => { return (
															<li className={"sidebar--option "+section.key+'-'+i+(main.checkboxes[section.key+'-'+i]&&' checked'||'')}>
																<label className="checkbox_wrap">
																	<input type="checkbox" checked={main.checkboxes[section.key+'-'+i]||false} onChange={e=>{this.toggle(section.key+'-', e, i)}}/>
																	<span className="checkbox_label">{value}</span>
																</label>
															</li>
														)})}
													</ul>
								        ) }
											</section>
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
