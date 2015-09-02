var HeaderView = Backbone.View.extend ({
	template: JST["backbone/templates/home_page/header"],

    initialize: function () {
	this.render();
},

	render: function () {
	$('#header').html( this.template() );

	return this;
}
});