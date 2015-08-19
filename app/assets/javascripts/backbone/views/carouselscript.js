var CarouselscriptView = Backbone.View.extend ({
	template: JST["backbone/templates/carouselscript"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('#scripts').html( this.template() );

	return this;
}
});