var CarouselscriptView = Backbone.View.extend ({
	template: JST["backbone/templates/carouselscript"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('#scripts').append( this.template() );

	return this;
}
});