var ArtistAdminView = Backbone.View.extend ({
	
	template: JST['backbone/templates/authors/new_artist_page'],

	initialize: function () {
		//console.log(this.model.toJSON());
	},

	render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        var descriptionView = new DescriptionView({
            model: this.model
        });
        //var morelessView = new MorelessView()
		return this;
	}

});