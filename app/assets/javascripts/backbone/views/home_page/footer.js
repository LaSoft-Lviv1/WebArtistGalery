var FooterView = Backbone.View.extend ({
	el: '#footer',
	template: JST["backbone/templates/home_page/footer"],

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(this.template());

	return this;
	}
});