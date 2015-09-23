class ArtistGallery.Models.ArtItem extends Backbone.Model
  urlRoot: 'art_items'
  paramRoot: 'art_item'

#defaults: ->

class ArtistGallery.Collections.ArtItemsCollection extends Backbone.Collection
  model: ArtistGallery.Models.ArtItem
  url: 'art_items'
  paramRoot: 'art_item'