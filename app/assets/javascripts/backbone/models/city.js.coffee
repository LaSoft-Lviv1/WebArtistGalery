class ArtistGallery.Models.City extends Backbone.Model
  urlRoot: 'city'

#defaults: ->

class ArtistGallery.Collections.CitiesCollection extends Backbone.Collection
  model: ArtistGallery.Models.City
  url: 'city'