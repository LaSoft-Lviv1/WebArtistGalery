window.ArtistGallery =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
  Vent: {}
  initialize: ->
#    ArtistGallery.currentUser = ArtistGallery.LoginHelpers.getCookie('user_email')
    #alert 'before router ctor'
    #new ArtistGallery.Routers.HomePageRouter()
    new ArtistGallery.Routers.ArtistGalleryRouter()
    #alert 'after router ctor'
    Backbone.history.start()

    #alert 'after history start'



$(document).ready ->
  ArtistGallery.initialize()