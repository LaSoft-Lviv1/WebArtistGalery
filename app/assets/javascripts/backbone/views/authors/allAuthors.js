var base,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(base = ArtistGallery.Views).Authors || (base.Authors = {});

ArtistGallery.Views.Authors.AllAuthorsView = (function(superClass) {
  extend(AllAuthorsView, superClass);

  function AllAuthorsView() {
    this.render = bind(this.render, this);
    this.addOneArtItemForHomePage = bind(this.addOneArtItemForHomePage, this);;
    this.addAll = bind(this.addAll, this);
    this.addAllFromReset = bind(this.addAllFromReset, this);
    this.initialize = bind(this.initialize, this);
    return AllAuthorsView.__super__.constructor.apply(this, arguments);
  };

    AllAuthorsView.prototype.template = JST["backbone/templates/authors/allAuthors"];

  //  IndexView.prototype.events = {
  //    "scroll": "scroll"
  //};

    function screenHeight(){
        var pos = $.browser.opera? window.innerHeight : $(window).height();
        return pos;
    }

    function scrollTop(){
        var pos = $.browser.mozilla? $(window).scrollTop() : document.body.scrollTop;
        return pos;
    }

    AllAuthorsView.prototype.scroll = function() {
        if (Backbone.History.started && Backbone.history.getFragment() == "authors" && this.index < this.collection.length) {
            if ((document.body.scrollHeight - (scrollTop() + screenHeight())) < 100) {
                temp = this.index;
                for (i = this.index; i < (temp + 9); i++) {
                    if (this.index < this.collection.length) {
                        //console.log(this.index);
                        this.addOneAuthorToPage(this.collection.at(i));
                        this.index += 1;
                    }
                }
                //console.log('<150');
            }else{
                //console.log('authors');
            }
        }

        return
    };

    AllAuthorsView.prototype.initialize = function() {
    //catch scroll event
    _.bindAll(this, 'scroll');
    // bind to window
    $(window).scroll(this.scroll);
    this.index = 0;
    ArtistGallery.LoginHelpers.reRenderLoginView();
    return this.listenTo(this.collection, "reset", this.addAllFromReset);
  };

    AllAuthorsView.prototype.addToCollection = function(model) {
    return this.collection.add(model);
  };

    AllAuthorsView.prototype.addAllFromReset = function() {
    return this.addAll();
  };

  AllAuthorsView.prototype.addAll = function() {
      for (i = this.index; i < 9; i++) {
          if (this.index < this.collection.length) {
              this.addOneAuthorToPage(this.collection.at(i));
              this.index += 1;
          }
      };
    return
  };

  AllAuthorsView.prototype.addOneAuthorToPage = function(author) {
    var viewOneAuthor= new ArtistGallery.Views.Authors.AuthorView({
      model: author
    });
    this.$(".container-fluid").append(viewOneAuthor.render().el);
    return
  };

    AllAuthorsView.prototype.render = function() {
    this.index = 0;
    this.$el.html(this.template());
        this.addAll();
    return this;
  };

  return AllAuthorsView;

})(Backbone.View);