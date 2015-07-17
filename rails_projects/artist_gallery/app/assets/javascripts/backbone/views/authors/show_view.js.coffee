ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.ShowView extends Backbone.View
  template: JST["backbone/templates/authors/show"]

  render: ->
    @$el.html(@template(@model.toJSON() ))
    return this
