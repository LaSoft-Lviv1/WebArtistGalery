var base,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;

(base = ArtistGallery.Views).Authors || (base.Authors = {});

ArtistGallery.Views.Authors.IndextView = (function(superClass) {
	extend(IndexView, superClass);


	function IndexView() {
		this.render = bind(this.render, this);
		this.addOneArtItemForCarousel = bind(this.addOneArtItemForCarousel, this);
		this.addAll = bind(this.addAll, this);
		this.addAllFromReset = bind(this.addAllFromReset, this);
		this.initialize = bind(this.initialize, this);
		return IndexView.__super__.constructor.apply(this, arguments);
	};

	IndexView.prototype.template = JST["backbone/templates/authors/index1"];

	IndexView.prototype.initialize = function () {
	  ArtistGallery.LoginHelpers.reRenderLoginView(this.model);
		this.listenTo(this.collection, "reset", this.addAllFromReset);
	}

	IndexView.prototype.addToCollection = function (model) {
		return this.collection.add(model);
	};

	IndexView.prototype.addAllFromReset = function() {
		return this.addAll();
	};

	IndexView.prototype.addAll = function() {
        this.collection.forEach(this.addOneArtItemForCarousel, this);
        var descriptionView = new DescriptionView();
	    $('.variable-width').slick({
			dots: false,
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true
		});
		return
	};

	IndexView.prototype.addOneArtItemForCarousel = function(art_item) {
		var oneArtItemView = new ArtistGallery.Views.Authors.ArtItemArtistView({
			model: art_item
		});
		this.$(".variable-width").append(oneArtItemView.render().el);
	  console.log('addoneartitem');
		return console.log('in addOneArtItem finish');
	};

	IndexView.prototype.render = function () {
	  console.log('artist_index_render');
	  this.$el.html(this.template());
		return this;
	};

	return IndexView;

})(Backbone.View);