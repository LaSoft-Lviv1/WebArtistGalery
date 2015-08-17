ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.PaintingForCarouselView extends Backbone.View
  template: JST["backbone/templates/home_page/paintinghomecarousel"]

  className: 'paint_outer'

  render: =>
    @$el.html(@template(@model.toJSON()))
    return this