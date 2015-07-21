class ArtistGallery.Models.Author extends Backbone.Model
  urlRoot: 'authors'

  #defaults: ->

class ArtistGallery.Collections.AuthorsCollection extends Backbone.Collection
  model: ArtistGallery.Models.Author
  url: 'authors'

  #initialize: -> alert this.url

  
