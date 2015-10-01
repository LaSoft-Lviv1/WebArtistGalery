var ArtistAdminView = Backbone.View.extend ({
	
	template: JST['backbone/templates/authors/new_artist_page'],

	initialize: function () {

		this.render();
	},

	render: function () {
		$('#content').html( this.template() );
		return this;
	}

});