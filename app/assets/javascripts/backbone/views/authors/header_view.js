var HeaderAuthorsView = Backbone.View.extend ({
	template: JST["backbone/templates/authors/header_authors"],
	//template: _.template(template),


	initialize: function () {
	this.render();
},

	render: function () {
	$('#header').html( this.template() );

	return this;
}
});

//var headerauthorsView = new HeaderAuthorsView();