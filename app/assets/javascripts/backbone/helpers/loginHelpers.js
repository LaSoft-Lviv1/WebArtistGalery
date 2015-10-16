ArtistGallery.LoginHelpers = {};

ArtistGallery.LoginHelpers.reRenderLoginView = function() {
    var login_model = new ArtistGallery.Models.Login();
    $('#modal').on('hidden.bs.modal', function (e) {
        this.view = new ArtistGallery.Views.Login({
            model: login_model
        });
        $(".modal-content").html(this.view.render().el);
    });
    return;
};

ArtistGallery.LoginHelpers.getCookie = function(name) {
    var regexp = new RegExp("(?:^" + name + "|;\s*"+ name + ")=(.*?)(?:;|$)", "g");
    var result = regexp.exec(document.cookie);
    return (result === null) ? null : result[1];
}
