frappe.ui.form.on('Stone Order', {
    // in the source country link field, we need to filter the countries based on the stone type selected in the child table
    setup: function (frm) {
        frm.set_query("source_country", "stone_types", (doc, cdt, cdn) => {
			return {
				"filters": {
                "name": ['in', frm.available_country_list]
                },
			};
		});
    }
});

frappe.ui.form.on('StoneOrderTable', {
    // this will fetch available countries based on selection of stone type
    async stone_type(frm, cdt, cdn) {
        let row = locals[cdt][cdn];
        const d = await frappe.db.get_doc('Stone Type', row.stone_type);
        frm.available_country_list = d.available_countries.map(row => row.country);
    },
    // when a new row is added in child table, reset the source country field
    stone_types_add: function(frm, cdt, cdn) {
         frappe.model.set_value(cdt, cdn, 'source_country', '');
    }
});


