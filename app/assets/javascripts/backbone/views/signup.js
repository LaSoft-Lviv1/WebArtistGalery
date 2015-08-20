var SignupView = Backbone.View.extend ({
	template: JST["backbone/templates/signup"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('.modal-content').html( this.template() );

	return this;
}
});