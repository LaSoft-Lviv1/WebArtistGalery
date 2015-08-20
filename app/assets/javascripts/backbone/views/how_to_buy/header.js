var HeaderHowToBuyView = Backbone.View.extend ({
	template: JST["backbone/templates/how_to_buy/header"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('#header').html( this.template() );

	return this;
}
});