window.ArtistGallery =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
  Vent: {}
  initialize: ->
    #alert 'before router ctor'
    #new ArtistGallery.Routers.HomePageRouter()
    new ArtistGallery.Routers.ArtistGalleryRouter( )
    #alert 'after router ctor'
    Backbone.history.start()

    #alert 'after history start'



$(document).ready ->
  #alert 'before ready'
  ArtistGallery.initialize()
  #alert 'after ready'

