ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.ArtItemView extends Backbone.View
  template: JST["backbone/templates/home_page/art_item"]

  render: =>
#alert 'in render addOne'
    @$el.html(@template(@model.toJSON()))
    return this