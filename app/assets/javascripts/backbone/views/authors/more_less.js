var MorelessView = Backbone.View.extend ({
	template: JST["backbone/templates/authors/more_less"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('#scripts').html( this.template() );

	return this;
}
});