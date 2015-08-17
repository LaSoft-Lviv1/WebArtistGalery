var ScriptsView = Backbone.View.extend ({
	template: JST["backbone/templates/authors/scripts"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('#scripts').html( this.template() );

	return this;
}
});