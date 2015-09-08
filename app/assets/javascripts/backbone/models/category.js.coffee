class ArtistGallery.Models.Category extends Backbone.Model
  urlRoot: 'categories'

#defaults: ->

class ArtistGallery.Collections.CategoriesCollection extends Backbone.Collection
  model: ArtistGallery.Models.Category
  url: 'categories'