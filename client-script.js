// validate-item-name
frappe.ui.form.on('Item', 'validate', function (frm) {
	if (frm.doc.item_name.includes(" ")) {
		frappe.msgprint("Item Name cannot have spaces.")
		frappe.validated = false
	}
})
// using a different syntax
// validate-item-name
frappe.ui.form.on('Item', {
	validate(frm) {
		if (frm.doc.item_name.includes(" ")) {
			frappe.msgprint("Item Name cannot have spaces.")
			frappe.validated = false
		}
	}
})

// item-price-premium-check
frappe.ui.form.on('Item Price', {
	price_list_rate(frm) {
		if (frm.doc.price_list_rate >= 100) {
			frm.set_value('custom_premium', 1)
		}
		else {
			frm.set_value('custom_premium', 0)
		}
	}
})

// item-custom-button
frappe.ui.form.on('Item', {
	refresh(frm) {
		frm.add_custom_button(
			__("Item Price"), function () {
				frappe.route_options = {
					item_code: frm.doc.item_code
				};
				frappe.set_route("item-price");
			},
			__('Info')
		);
		frm.add_custom_button(
			__("Item Report"), function () {
				frappe.route_options = {
					item_code: frm.doc.item_code
				};
				frappe.set_route("item", "view", "report");
			},
			__('Info')
		);
	}
})

// make a doctype entry after save
frappe.ui.form.on('Student Registration', {
    after_save(frm) {
        if (frm.doc.registration_status == "Completed") {
            frappe.call({
                method: "frappe.client.insert",
                args: {
                    doc: {
                        doctype: "Student",
                        student_name: frm.doc.student_name,
                        age: frm.doc.age
                    }
                },
                callback: function (response) {
                    if (response.message) {
                        frappe.msgprint(__('{0} created successfully!', [response.message.student_name]));
                        frappe.set_route("Form", "Student", response.message.name);
                    }
                }
            });
        }
    }
})

// How to fetch logged in user and set that to a field in the doctype.
frappe.ui.form.on('Event Registration', {
    refresh: function(frm) {
        frm.set_value('logged_in_user', frappe.session.user_fullname);
    }
});

// How to add calender view to list view.
// In this example adding calendar view to "Delivery Note"
frappe.views.calendar["Delivery Note"] = {
	field_map: {
		"start": "posting_date",
		"end": "posting_date",
		"id": "name",
		"title": "customer",
		"allDay": "allDay",
		"progress": "progress"
	}
};