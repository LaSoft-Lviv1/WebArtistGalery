var ArtItemCartView;
ArtItemCartView = Backbone.View.extend ({
	template:  JST["backbone/templates/cart/artItemCart"],
	tagName: 'tr',
	events: {
	    "click .unlock" : "unlock",
 	},
	initialize: function () {
		this.listenTo(this.model, 'destroy', this.remove);

		var d = new Date(this.model.get('updated_at'));

		var curr_date = d.getDate();
		var curr_month = d.getMonth() + 1;
		var curr_year = d.getFullYear();
	
		d = curr_date + '/' + curr_month + '/' +curr_year;

		this.model.set({updated_at: d});
	},
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		$('#cartitems').append(this.$el)
		return this;
	},
	unlock: function (e) {
		this.model.destroy();
	}
});