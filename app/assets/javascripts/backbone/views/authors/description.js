var DescriptionView = Backbone.View.extend ({
	template: JST["backbone/templates/authors/description"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('.description').html( this.template() );

	return this;
}
});