var UserCartView;
UserCartView = Backbone.View.extend ({
	template:  JST["backbone/templates/cart/cart"],

	initialize: function () {
		this.render();
	},
	render: function () {
		$('#content').html( this.template() );
		return this;
	}
});