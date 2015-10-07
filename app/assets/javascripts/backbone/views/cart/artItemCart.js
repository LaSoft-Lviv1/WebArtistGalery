var ArtItemCartView;
ArtItemCartView = Backbone.View.extend ({
	template:  JST["backbone/templates/cart/artItemCart"],
	tagName: 'tr',
	initialize: function () {

	},
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		$('#cartitems').append(this.$el)
		return this;
	}
});