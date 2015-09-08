class ArtistGallery.Models.Orientation extends Backbone.Model
  urlRoot: 'orientations'

#defaults: ->

class ArtistGallery.Collections.OrientationsCollection extends Backbone.Collection
  model: ArtistGallery.Models.Orientation
  url: 'orientations'