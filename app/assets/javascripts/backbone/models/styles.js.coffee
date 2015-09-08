class ArtistGallery.Models.Style extends Backbone.Model
  urlRoot: 'styles'

#defaults: ->

class ArtistGallery.Collections.StylesCollection extends Backbone.Collection
  model: ArtistGallery.Models.Style
  url: 'styles'