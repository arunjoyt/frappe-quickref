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