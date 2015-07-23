var Painting = Backbone.Model.extend({
  defaults: {
      artist: 'Chris Sharma',
      title: 'Climber',
      price: 200,
      url: 'http://www.bigupproductions.com/wp-content/files_mf/1353909745pacha.jpg'
  }
});

var painting = new Painting();

var GalleryCollection = Backbone.Collection.extend({
  model: Painting
});

var GalleryView = Backbone.View.extend({
  tagName: 'div',
  className: 'container-fluid',

  initialize: function() {
  },

  render: function() {
    //пройтись по всьому списку і зрендерити кожен GalleryView
    this.collection.each(function(painting) {
        var paintingView = new PaintingView({model: painting});

        this.$el.append(paintingView.render().el);
    }, this);

        return this;
    //вставити в головний тег div (this.$el)
  }
});

var PaintingView = Backbone.View.extend({
  tagName: 'div',
  className: 'col-xs-12 col-sm-4 col-md-4 col-lg-4 work_outer',

  template:_.template( $('#painting-id').html() ),

  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html( this.template( this.model.toJSON() ) );

    return this;
  }
});

var galleryCollection = new GalleryCollection([
  {
    artist: 'Chris Sharma',
    title: 'Meditation',
    price: 200,
    url: 'http://static1.squarespace.com/static/53974d6fe4b067f5901248a2/5398bd95e4b0ac2dcfe61851/5398bd99e4b00b23ed1cff70/1402518948494/1003948_cropped.jpg'

  },
  {
    artist: 'Chris Sharma',
    title: 'Trying so hard',
    price: 200,
    url: 'http://www.bigupproductions.com/wp-content/files_mf/1353909745pacha.jpg'
  },
  {
    artist: 'Chris Sharma',
    title: 'Starting',
    price: 200,
    url: 'http://d32y13ngxxhn1k.cloudfront.net/wp-content/uploads/2012/06/228_hf3_25255.jpg'
  },
  {
    artist: 'Chris Sharma',
    title: 'Muscules',
    price: 200,
    url: 'https://s-media-cache-ak0.pinimg.com/736x/b8/c1/03/b8c1032b013e6f09525bfde203f149af.jpg'
  },
  {
    artist: 'Chris Sharma',
    title: 'Checkup',
    price: 200,
    url: 'http://www.thestar.com.my/~/media/Images/TSOL/Photos-Gallery/features/2013/10/19/str2_qs_1910_p14A.ashx/?w=620&h=413&crop=1&'
  },
  {
    artist: 'Chris Sharma',
    title: 'Next move',
    price: 200,
    url: 'http://www.climberism.com/wp-content/uploads/2012/10/sharma.jpeg'
  },
  {
    artist: 'Chris Sharma',
    title: 'Evrything is possible',
    price: 200,
    url: 'http://178.237.111.13/files/fckfiles/image/news/sport/climbing/sharma-back-ceuse/Chris-Sharma-climbing.jpg'
  }
]);

var galleryView = new GalleryView({collection: galleryCollection});

$(document.body).append(galleryView.render().el);


