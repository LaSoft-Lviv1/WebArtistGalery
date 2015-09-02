var bind = function(fn, me) {
        return function() {
            return fn.apply(me, arguments);
        };
    },
    extend = function(child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
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
        'howToBuy': "howToBuy",
        'aboutUs': "howToBuy",
        'FAQ': "howToBuy",
        'login': "login",
        'logout': "logout",
        'signup': "signup",
        'artItems/new': "newArtItem",
        '.*': "index"
    };

  ArtistGalleryRouter.prototype.initialize = function() {
    //ArtistGallery.loginmodel = new ArtistGallery.Models.Login();
      this.login_model = new ArtistGallery.Models.Login();
      ArtistGallery.LoginHelpers.reRenderLoginView(this.login_model);
    this.footerView = new FooterView;
    this.authors = new ArtistGallery.Collections.AuthorsCollection();
    return //this.authors.fetch({
    //  reset: true
    //});
  };

    ArtistGalleryRouter.prototype.showArtItemToJSON = function() {
        return console.log(this.art_items.toJSON());
    };

  ArtistGalleryRouter.prototype.index = function() {
    this.login_model = new ArtistGallery.Models.Login();
    this.headerView = new HeaderView();
    this.view = new ArtistGallery.Views.Login({
      model: this.login_model
    });
    $(".modal-content").html(this.view.render().el);
    this.art_items = new ArtistGallery.Collections.ArtItemsCollection();
    this.art_items.fetch({
        data: $.param({great: 'Hello'}),
        reset: true
    });
    this.homeView = new ArtistGallery.Views.HomePage.IndexView({
      model: this.login_model,
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

  ArtistGalleryRouter.prototype.logout = function() {
      console.log('from logout');
      console.log(this.login_model);
      this.login_model.set({
          id: 1
      });
      console.log(this.login_model);
      this.login_model.destroy({
          data: $.param({user_token: localStorage.getItem('user_token')})
      });
      localStorage.setItem('user_token', '');
      localStorage.setItem('email', '');
      window.location.href = '/#';
      return
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
        model: this.login_model,
        collection: this.art_items
    });
    $("#content").html(this.view.render().el);
    return
  };

  ArtistGalleryRouter.prototype.howToBuy = function() {
      //this.renderLogin();
      this.headerHowToBuyView = new HeaderHowToBuyView();
    this.view = new ArtistGallery.Views.Login({
        model: this.login_model
    });
    $(".modal-content").html(this.view.render().el);
    this.howToBuy = new HowToBuyView({
        model: this.login_model
    });
    return
  };

  ArtistGalleryRouter.prototype.newArtItem = function() {
        this.headerView = new HeaderView();
        this.addArtItemView = new AddArtItemView();
        $("#content").html(this.view.render().el);
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
