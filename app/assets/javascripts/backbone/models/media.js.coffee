class ArtistGallery.Models.Media extends Backbone.Model
  urlRoot: 'media'

#defaults: ->

class ArtistGallery.Collections.MediasCollection extends Backbone.Collection
  model: ArtistGallery.Models.Media
  url: 'media'