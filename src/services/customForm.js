import $ from 'jquery'

var FormHandler = {

	validate: function (event) {
		// Make work for gated form too
		try {
			var form = $(event.target),
				required_fields = form.find("input.required,select.required,textarea.required");
			required_fields.each(function (index, identifier) {
				var field = $(identifier);
				var empty_field = (((["checkbox", "radio"].indexOf(field.attr("type")) >= 0) && !field.is(':checked')) || field.val() === "");
				FormHandler.prevent_email_population(field);

				if (empty_field && field.attr("type") === "radio") {
					empty_field = form.find('input[name=' + field.attr("name") + ']:checked').val() === undefined;
				}

				if (empty_field) {
					field.addClass("invalid");
				}
				;
			});

			FormHandler.check_password();

			var invalid_fields = form.find(".invalid").map(function (index, field) {
				return field.id;
			});

			var valid = invalid_fields.length == 0,
				form_message = form.find(".message");

			var email = $("input[type='email']").val();

			if (FormHandler.is_proper_email(email)) {
				$("input[type='email']").removeClass("invalid");
			} else {
				$("input[type='email']").addClass("invalid");
			}

			if (valid) {
				form_message.hide();
			} else {
				var message = "Please enter valid values for the fields marked in red.";
				form_message.html(message).show();
			}

		} catch (x) {
			console.log(x);
		}
		return valid;
	},

	validate_existence_of_input: function (event) {
		var target = $(event.target),
			blank = target.val() == '';
		if (!blank) {
			target.removeClass('invalid');
		}
	},

	validate_existence_of_checkbox: function (event) {
		var target = $(event.target);
		if (target.is(':checked')) {
			target.removeClass('invalid');
		}
	},

	change_checkbox_value: function (event) {
		var target = $(event.target);
		if (target.is(':checked')) {
			target.val("true");
		} else {
			target.val("false");
		}
	},


	validate_selected_radio: function (event) {
		var target = $("input[type=radio]"),
			checked_value = $("input[type=radio]:checked").val();
		if (target.is(':checked')) {
			target.removeClass('invalid');
		}
		if ($("div").hasClass('select-demo')) {
			$("#SFDC_Campaign_ID__c").attr('value', checked_value);
			if ($("input[type=radio]:checked").attr('id') == "select_optima") {
				$("#Offer_Source__c").attr('value', 'Request Optima Demo');
			} else if ($("input[type=radio]:checked").attr('id') == "select_cmp") {
				$("#Offer_Source__c").attr('value', 'Request CMP Demo');
			}
		} else {
			$("#RF_GHQ_Location_Type__c").attr('value', checked_value);
		}
	},

	prevent_email_population: function (field) {
		var value = field.val();

		if (field.attr("name") != "email") {
			if (value.match(/.[@]/)) {
				field.addClass("invalid");
			}
		}
	},


	mark_email_invalid: function () {
		$("input[type='email']").addClass("invalid");
		$(".email_validation.status.checking").show().removeClass("hidden").removeClass("checking");
	},

	mark_email_valid: function () {
		$("input[type='email']").removeClass("invalid");
		$(".email_validation.status").removeClass("checking").hide();
	},

	gather_fields: function (form, fields_to_gather) {
		var data = {},
			fields_in_form = form.find("input,textarea,select,hidden");

		var found_fields = fields_in_form.filter(function (n, field) {
			var name = $(field).attr('name');
			var found = fields_to_gather.indexOf(name) != -1
			return found;
		});

		$.map(found_fields, function (raw_field) {
			var field = $(raw_field);
			data[field.attr('name')] = field.val();
		});

		return data;
	},


	send_marketing_data: function (fields, form, response_function, additional_fields) {
		try {
			var fields_to_gather = [];
			$(form).find("input").map(function (i, field) {
				if (field.type.match(/text|email|tel|hidden|radio|checkbox/)) {
					fields_to_gather.push(field.name);
				}
			});
			$(form).find("select").map(function (i, field) {
				fields_to_gather.push(field.name);
			});

			// Putting in logic to gather multiple checkbox functionality for re:Invent LP. Need to generify later
			$("input[name='infrastructure']:checked").val()
			var cloudOption = $("input[name='infrastructure']:checked");
			var selectedClouds = [];
			cloudOption.each(function () {
				selectedClouds.push($(this).val());
			});
			$("#ISV_Interest__c").attr("value", selectedClouds);


			if ($("#FormComments").length > 0) {
				fields_to_gather.push("FormComments");
			}

			var marketing_data = FormHandler.gather_fields(form, fields_to_gather);


			if (additional_fields) {
				marketing_data["Signup_RS_Account__c"] = additional_fields["account_id"];
				marketing_data["RS_User_ID__c"] = additional_fields["user_id"];
			}


			return $.ajax({
				type: "POST",
				dataType: "json",
				url: "https://s2391.t.eloqua.com/e/f2",
				data: marketing_data,
				context: {form: form},
				complete: response_function
			});


		} catch (x) {
			console.log(x);
		}
		return false;
	},

	handle_marketing_response: function (event) {
		var form = this.form,
			asset_label = form.find("input[name='asset_label']").val(),
			employee_size = form.find("input[name='NumberOfEmployees']").val(),
			country_list = ["Australia", "Canada", "Denmark", "Great Britain", "Hong Kong", "Israel", "Malaysia", "Netherlands", "New Zealand", "Norway", "Sweden", "Switzerland", "Turkey", "United Kingdom", "UK", "GBR", "USA", "England", "United States"],
			country = form.find("input[name='country']").val();
		if (form.hasClass("redirect")) {
			if (($.inArray(country, country_list) > -1) && employee_size > 1000) {
				$("#cm_redirect").attr("action", "/premium-free-trial-offer-enterprise")
			}
			$('#cm_redirect').submit();


		} else if (form.hasClass("all-export")) {
			// jQuery.magnificPopup.open({items: {src: '#thank-you-all'}});
		} else if (form.hasClass("selected-export")) {
			// jQuery.magnificPopup.open({items: {src: '#thank-you-selected'}});
		} else {
			// jQuery.magnificPopup.open({items: {src: '#thank-you'}});
		}
	},

	handle_submit: function (event) {
		var form = $(event.target);
		if (form.attr("id") == "cm_redirect") {
			return true;
		}
		event.stopPropagation();
		var status = FormHandler.validate(event),
			has_action = form.attr("action") != "";
		$.data(document.body, "form", form);

		if (!status) {
			return false;
		}


		FormHandler.send_marketing_data(form, FormHandler.handle_marketing_response);

		var form_name = $('#FormName').val();
		if (form_name != "Contact_Us") {
			// jQuery.magnificPopup.open({items: {src: '#processing'}});
		}
		event.preventDefault();
		return false;
	}
};

// jQuery(document).ready(
// 	function ($) {
// 		$("input[type='email']").blur(FormHandler.validate_email);
// 		// Take parameters from URL
// 		var sUrlVar = $.getQueryString({ID: "campaign"});
// 		// put it in the designated block
// 		if (sUrlVar != undefined) {
// 			$("#SFDC_Campaign_ID__c").attr('value', escape(sUrlVar));
// 		}
// 		// Take parameters from URL
// 		var lsUrlVar = $.getQueryString({ID: "ls"});
// 		// put it in the designated block
// 		if (lsUrlVar != undefined) {
// 			$("#LeadSource").attr('value', escape(lsUrlVar));
// 		}
//
// 		// free-trial
// 		if ($("#Create_Account").val() == "Yes") {
// 			$("#password,#password_confirmation").keyup(FormHandler.check_password);
// 			$("input[type=radio]").change(FormHandler.handle_dashboard_selected);
// 			FormHandler.apply_optional_staging_fields($("#sign_up_form"));
// 			var sign_up_form = $("#sign_up_form");
// 			FormHandler.dashboard_select(sign_up_form);
// 		}
// 		$("form").submit(FormHandler.handle_submit);
//
// 		$("input.required").blur(FormHandler.validate_existence_of_input);
// 		$("select.required").change(FormHandler.validate_existence_of_input);
// 	});


export default FormHandler;
