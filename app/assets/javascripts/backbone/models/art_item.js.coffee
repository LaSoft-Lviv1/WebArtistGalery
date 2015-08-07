class ArtistGallery.Models.ArtItem extends Backbone.Model
  urlRoot: 'art_items'

#defaults: ->

class ArtistGallery.Collections.ArtItemsCollection extends Backbone.Collection
  model: ArtistGallery.Models.ArtItem
  url: 'art_items'