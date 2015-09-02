var base,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

(base = ArtistGallery.Views).HomePage || (base.HomePage = {});

ArtistGallery.Views.HomePage.IndexView = (function(superClass) {
  extend(IndexView, superClass);

  function IndexView() {
    this.render = bind(this.render, this);
    this.addOneArtItemForHomePage = bind(this.addOneArtItemForHomePage, this);
    this.addOneArtItemForCarousel = bind(this.addOneArtItemForCarousel, this);
    this.addAll = bind(this.addAll, this);
    this.addAllFromReset = bind(this.addAllFromReset, this);
    this.initialize = bind(this.initialize, this);
    return IndexView.__super__.constructor.apply(this, arguments);
  };

  IndexView.prototype.template = JST["backbone/templates/home_page/index"];

  IndexView.prototype.initialize = function() {
    ArtistGallery.LoginHelpers.reRenderLoginView();
    console.log('in home page index view initialize');
    return this.listenTo(this.collection, "reset", this.addAllFromReset);
  };

  IndexView.prototype.addToCollection = function(model) {
    return this.collection.add(model);
  };

  IndexView.prototype.addAllFromReset = function() {
    console.log('from reset');
    return this.addAll();
  };

  IndexView.prototype.addAll = function() {
    console.log('in addAll start');
    console.log(this.collection.toJSON());
    console.log('in addAll start');
    this.collection.forEach(this.addOneArtItemForHomePage, this);
    this.collection.first(this.addOneArtItemForHomePage, this);
    this.collection.forEach(this.addOneArtItemForCarousel, this);
    console.log('in addAll finish');
    var carouselscriptView = new CarouselscriptView();
    return
  };

  IndexView.prototype.addOneArtItemForCarousel = function(art_item) {
    var viewOneArtItem;
    console.log('in addOneArtItem start');
    console.log(art_item.toJSON());
    viewOneArtItem = new ArtistGallery.Views.HomePage.PaintingForCarouselView({
      model: art_item
    });
    this.$(".variable-width").append(viewOneArtItem.render().el);
    return console.log('in addOneArtItem finish');
  };

  IndexView.prototype.addOneArtItemForHomePage = function(art_item) {
    var viewOneArtItem;
    console.log('in addOneArtItem start');
    console.log(art_item.toJSON());
    viewOneArtItem = new ArtistGallery.Views.HomePage.ArtItemView({
      model: art_item
    });
    this.$(".container-fluid").append(viewOneArtItem.render().el);
    return console.log('in addOneArtItem finish');
  };

  IndexView.prototype.render = function() {
    console.log('in render');
    console.log(this.collection.toJSON());
    this.collection.forEach(this.addOneArtItemForCarousel, this);
    this.collection.forEach(this.addOneArtItemForHomePage, this);
    this.$el.html(this.template());
    console.log('in render index view art_item finish');
    return this;
  };

  return IndexView;

})(Backbone.View);