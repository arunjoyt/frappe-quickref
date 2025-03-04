// validate-item-name
frappe.ui.form.on('Item', 'validate', function(frm){
    if(frm.doc.item_name.includes(" ")){
        frappe.msgprint("Item Name cannot have spaces.")
        frappe.validated = false
    }
})

// item-price-premium-check
frappe.ui.form.on('Item Price', {
	price_list_rate(frm) {
		if(frm.doc.price_list_rate >= 100){
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
		    __("Item Price"), function() {
		        frappe.route_options = {
		            item_code:frm.doc.item_code
		        };
		        frappe.set_route("item-price");
		    },
		    __('Info')
		    );
		frm.add_custom_button(
		    __("Item Report"), function() {
		        frappe.route_options = {
		            item_code:frm.doc.item_code
		        };
		        frappe.set_route("item", "view", "report");
		    },
		    __('Info')
		    );
	}
})