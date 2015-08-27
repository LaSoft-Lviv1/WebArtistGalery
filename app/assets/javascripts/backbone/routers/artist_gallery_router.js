var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ArtistGallery.Routers.ArtistGalleryRouter = (function(superClass) {
  extend(ArtistGalleryRouter, superClass);

  function ArtistGalleryRouter() {
    this.show = bind(this.show, this);
    this.showAuthors = bind(this.showAuthors, this);
    this.index = bind(this.index, this);
    return ArtistGalleryRouter.__super__.constructor.apply(this, arguments);
  }

  ArtistGalleryRouter.prototype.routes = {
    '': "index",
    'authors': "showAuthors",
    'authors/new': "newAuthor",
    'authors/:id': "show",
    ':id/edit': "edit",
    'index': "index",
    'howtobuy': "howToBuy",
    'about-us': "howToBuy",
    'FAQ': "howToBuy",
    'login': "login",
    'logout': "logout",
    'signup': "signup",
    '.*': "index"
  };

  ArtistGalleryRouter.prototype.initialize = function() {
    this.renderLogin();
    this.footerView = new FooterView;
    this.authors = new ArtistGallery.Collections.AuthorsCollection();
    return this.authors.fetch({
      reset: true
    });
  };

  ArtistGalleryRouter.prototype.showArtItemToJSON = function() {
    return console.log(this.art_items.toJSON());
  };

  ArtistGalleryRouter.prototype.index = function() {
    this.headerView = new HeaderView();
    this.view = new ArtistGallery.Views.Login({
      model: new ArtistGallery.Models.Login()
    });
    $(".modal-content").html(this.view.render().el);
    this.art_items = new ArtistGallery.Collections.ArtItemsCollection();
    this.art_items.fetch({
        data: $.param({great: 'Hello'}),
        reset: true,
    });
    this.homeView = new ArtistGallery.Views.HomePage.IndexView({
      collection: this.art_items
    });
    $("#content").html(this.homeView.render().el);

    return
  };

  ArtistGalleryRouter.prototype.signup = function() {
    this.view = new SignupView();
    return
  };

  // ArtistGalleryRouter.prototype.signup = function() {
  //   this.view = new ArtistGallery.Views.Signup({
  //     model: new ArtistGallery.Models.Registration()
  //   });
  //   return $(".modal-content").html(this.view.render().el);
  // };

  ArtistGalleryRouter.prototype.login = function() {
    this.view = new ArtistGallery.Views.Login({
      model: new ArtistGallery.Models.Login()
    });
    return $(".modal-content").html(this.view.render().el);
  };


  ArtistGalleryRouter.prototype.showAuthors = function() {
      this.renderLogin();
      this.headerauthorsView = new HeaderAuthorsView();
    this.view = new ArtistGallery.Views.Login({
      model: new ArtistGallery.Models.Login()
    });
    $(".modal-content").html(this.view.render().el);
    this.art_items = new ArtistGallery.Collections.ArtItemsCollection();
    this.art_items.fetch({
      reset: true
    });
    this.view = new ArtistGallery.Views.Authors.IndextView({
    collection: this.art_items
    });
    $("#content").html(this.view.render().el);
    return
  };

  ArtistGalleryRouter.prototype.howToBuy = function() {
      this.renderLogin();
      this.headerHowToBuyView = new HeaderHowToBuyView();
    this.view = new ArtistGallery.Views.Login({
      model: new ArtistGallery.Models.Login()
    });
    $(".modal-content").html(this.view.render().el);
    this.howToBuy = new HowToBuyView();
    return
  };

  ArtistGalleryRouter.prototype.show = function(id) {
    var author;
    author = this.authors.get(id);
    this.viewShow = new ArtistGallery.Views.Authors.ShowView({
      model: author
    });
    return $("#content").html(this.viewShow.render().el);
  };

  ArtistGalleryRouter.prototype.newAuthor = function() {
    this.viewNewAuthor = new ArtistGallery.Views.Authors.NewView({
      collection: this.authors
    });
    $("#content").html(this.viewNewAuthor.render().el);
    return console.log("after rendering");
  };

  ArtistGalleryRouter.prototype.edit = function(id) {
    var author;
    author = this.authors.get(id);
    this.view = new ArtistGallery.Views.Authors.EditView({
      model: author
    });
    return $("#content").html(this.view.render().el);
  };

  ArtistGalleryRouter.prototype.renderLogin = function() {
      //$('#modal').on('hidden.bs.modal', function (e) {
      //    this.view = new ArtistGallery.Views.Login({
      //        model: new ArtistGallery.Models.Login()
      //    });
      //    $(".modal-content").html(this.view.render().el);
      //});
      //alert('from script');
  };

  return ArtistGalleryRouter;

})(Backbone.Router);
