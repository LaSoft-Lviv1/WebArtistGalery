ArtistGallery.LoginHelpers = {};

ArtistGallery.LoginHelpers.reRenderLoginView = function() {
    $('#modal').on('hidden.bs.modal', function (e) {
        this.view = new ArtistGallery.Views.Login({
            model: new ArtistGallery.Models.Login()
        });
        $(".modal-content").html(this.view.render().el);
    });
    return;
};
