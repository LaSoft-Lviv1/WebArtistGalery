var FooterView = Backbone.View.extend ({
	template: JST["backbone/templates/home_page/footer"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('#footer').html( this.template() );

	return this;
}
});