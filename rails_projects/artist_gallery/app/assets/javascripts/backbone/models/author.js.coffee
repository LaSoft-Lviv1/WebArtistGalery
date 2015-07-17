class ArtistGallery.Models.Author extends Backbone.Model
  paramRoot: 'author'

  defaults: ->

class ArtistGallery.Collections.AuthorsCollection extends Backbone.Collection
  model: ArtistGallery.Models.Author
  url: '/authors'
