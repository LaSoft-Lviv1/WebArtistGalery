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
        'authors':      "showAuthors",
        'authors/new':  "newAuthor",
        'authors/:id':  "show",
        ':id/edit':     "edit",
        'index':        "index",
        'howToBuy':     "howToBuy",
        'aboutUs':      "howToBuy",
        'FAQ':          "howToBuy",
        'signout':      "signout",
        'artItems/new': "newArtItem",
        'artItems/:id': "detailedArtItem",
        'artistAdmin': "artistAdmin",
        'users/confirmation': 'confirmation',
        'users/password': 'passwordRecovery',
        'users/password/edit': 'passwordRecoveryEdit',
        'cart' : "userCart",
        '.*': "index"
    };


  ArtistGalleryRouter.prototype.userCart = function() {
     if(localStorage.length === 0 || localStorage.getItem('user_token') === '') {
         window.location.href = '/#';
     } else {
        var self = this;    
        this.userCarts = new ArtistGallery.Collections.CartCollection(/*[
          {
            back: 'vova'
          },
          {
            back: 'vova'
          },
          {
            front: 'Ira'
          }]*/);
      
        this.userCarts.fetch().then(function() {
          console.log(self.userCarts);
          //debugger;
          self.userCartView = new UserCartView({collection: self.userCarts});
        });

        
        return
      }
  };

  ArtistGalleryRouter.prototype.initialize = function() {
    this.login_model = new ArtistGallery.Models.Login();
    ArtistGallery.LoginHelpers.reRenderLoginView(this.login_model);
    this.headerView = new HeaderView();
    this.renderLoginView();
    this.footerView = new FooterView;
    this.authors = new ArtistGallery.Collections.AuthorsCollection();
    return //this.authors.fetch({
    //  reset: true
    //});
  };

  ArtistGalleryRouter.prototype.confirmation = function() {
      var token = ArtistGallery.ArtistGalleryHelpers.getQueryString('confirmation_token');
      var confirmationModel = new ArtistGallery.Models.Confitmation();
      confirmationModel.fetch({
          data: $.param({confirmation_token: token}),
          success: function (response) {
              alert('Confirmed successfuly!');
              window.location.href = '/#';
          },
          error: function (model, xhr, options) {
              if (xhr.responseJSON.message.email){
                  alert('Email ' + xhr.responseJSON.message.email);
                  //console.log(xhr.responseJSON.message.email);
              };
              if(xhr.responseJSON.message.confirmation_token){
                  alert('Confirmation token ' + xhr.responseJSON.message.confirmation_token);
                  //console.log(xhr.responseJSON.message.confirmation_token);
              };
              window.location.href = '/#';
          }
      });
      //console.log(token);
      return
  };

    ArtistGalleryRouter.prototype.passwordRecovery = function() {
        this.passwordRecoveryMail = new ArtistGallery.Views.PasswordRecoveryMail();
        $("#content").html(this.passwordRecoveryMail.render().el);
        return
    };


    ArtistGalleryRouter.prototype.passwordRecoveryEdit = function() {
        var token = ArtistGallery.ArtistGalleryHelpers.getQueryString('reset_password_token');
        this.passwordRecoveryModel = new ArtistGallery.Models.RecoveryPassword();
        this.passwordRecoveryModel.set({
            id: 1,
            reset_password_token: token
        });
        this.passwordRecoveryEdit = new ArtistGallery.Views.PasswordRecoveryEdit({
            passwordRecoveryModel:  this.passwordRecoveryModel
        });
        $("#content").html(this.passwordRecoveryEdit.render().el);
        return
    }

  ArtistGalleryRouter.prototype.renderLoginView = function() {
    this.login_model = new ArtistGallery.Models.Login();
    this.view = new ArtistGallery.Views.Login({
      model: this.login_model
    });
    $(".modal-content").html(this.view.render().el);
    return
  };

  ArtistGalleryRouter.prototype.index = function() {
    this.art_items = new ArtistGallery.Collections.ArtItemsCollection();
    this.art_items.fetch({
        data: $.param({great: 'Hello'}),
        reset: true
    });
    this.homeView = new ArtistGallery.Views.HomePage.IndexView({
      collection: this.art_items
    });
    $("#content").html(this.homeView.render().el);
    return
  };

  ArtistGalleryRouter.prototype.signout = function() {
      this.login_model.set({
          id: 1
      });
      this.login_model.destroy({
          data: $.param({user_token: localStorage.getItem('user_token')})
      });
      localStorage.setItem('user_token', '');
      localStorage.setItem('name', '');
      localStorage.setItem('role', '');
      window.location.href = '/#';
      this.headerView.render();
      this.renderLoginView();
      return
  };

  ArtistGalleryRouter.prototype.showAuthors = function() {
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

  ArtistGalleryRouter.prototype.detailedArtItem = function(id) {
      this.art_items = new ArtistGallery.Collections.ArtItemsCollection();
      this.art_items.fetch({
          reset: true,
          success: function (collection, response) {
              this.art_item = collection.get(id);
              var view = new DetailedArtItemView({
                  model: this.art_item,
                  collection: collection
              });
              $("#content").html(view.render().el);
          }
      });
      return
    };

  ArtistGalleryRouter.prototype.howToBuy = function() {
    this.howToBuy = new HowToBuyView();
    return
  };

   ArtistGalleryRouter.prototype.artistAdmin = function() {
    this.artistAdminView = new ArtistAdminView();
    var descriptionView = new DescriptionView();
    var morelessView = new MorelessView();
    return
  };

  ArtistGalleryRouter.prototype.newArtItem = function() {
      this.addArtItemView = new AddArtItemView();
      $("#content").html(this.addArtItemView.render().el);
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

  return ArtistGalleryRouter;

})(Backbone.Router);
