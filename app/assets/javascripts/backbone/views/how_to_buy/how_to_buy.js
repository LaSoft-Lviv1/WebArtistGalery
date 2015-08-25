var HowToBuyView = Backbone.View.extend ({
	template: JST["backbone/templates/how_to_buy/how_to_buy"],

	initialize: function () {
        ArtistGallery.LoginHelpers.reRenderLoginView();
	    this.render();
},

	render: function () {
	$('#content').html( this.template() );

	return this;
}
});