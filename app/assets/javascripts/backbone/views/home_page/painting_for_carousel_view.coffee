ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.PaintingForCarouselView extends Backbone.View
  template: JST["backbone/templates/home_page/paintinghomecarousel"]

  render: =>
    @$el.html(@template(@model.toJSON()))
    return this




