var ArtistAdminView = Backbone.View.extend ({
	
	template: JST['backbone/templates/authors/artist_admin'],

	initialize: function () {

		this.render();
	},

	render: function () {
		$('#content').html( this.template() );
		return this;
	}

});