var SignupView = Backbone.View.extend ({
    template: JST["backbone/templates/registration/signup"],

    events: {
        'click .artist': 'artistSignup',
        'click .customer': 'customerSignup'
    },

    initialize: function () {
        this.render();
    },

    artistSignup: function (e) {
        e.preventDefault();
        this.view = new ArtistGallery.Views.SignupArtist({
            model: new ArtistGallery.Models.Registration()
        });
        $(".modal-content").html(this.view.render().el);
        return this;
    },

    customerSignup: function (e) {
        e.preventDefault();
        this.view = new ArtistGallery.Views.SignupCustomer({
            model: new ArtistGallery.Models.Registration()
        });
        $(".modal-content").html(this.view.render().el);
        return this;
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    }
});