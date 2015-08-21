ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.ArtItemArtistView extends Backbone.View
  template: JST["backbone/templates/authors/art_items_artist"]

  className: 'paint_outer'

  render: =>
    @$el.html(@template(@model.toJSON()))
    return this