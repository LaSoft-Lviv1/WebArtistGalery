window.ArtistGallery =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
  initialize: ->
    #alert 'before router ctor'
    new ArtistGallery.Routers.AuthorsRouter()
    #alert 'after router ctor'
    Backbone.history.start()
    #alert 'after history start'



$(document).ready ->
  alert 'before ready'
  ArtistGallery.initialize()
  alert 'after ready'

