ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.ShowView extends Backbone.View
  template: JST["backbone/templates/authors/show"]

  render: ->
    console.log @model.toJSON()
    @$el.html(@template(@model.toJSON()))
    console.log 'after show view'
    return this
