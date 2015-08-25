var SignupView = Backbone.View.extend ({
	template: JST["backbone/templates/signup"],

    events: {
        'click .artist': 'artistSignup',
        'click .customer': 'customerSignup',
    },

	initialize: function () {
	this.render();
    },

    artistSignup: function (e) {
        e.preventDefault();
        this.view = new ArtistGallery.Views.SignupArtist();
        $(".modal-content").html(this.view.render().el);
        alert('artist');
        return this;
    },

    customerSignup: function (e) {
        e.preventDefault();
        // @view = new ArtistGallery.Views.SignupArtist()
        this.view = new ArtistGallery.Views.SignupCustomer();
        $(".modal-content").html(this.view.render().el);
        //$('.modal-content').html( this.template() );
        alert('customer');
        return this;
    },

    render: function () {
	// $('.modal-content').html( this.template() );
    this.$el.html(this.template());

	return this;
    }
});