window.ArtistGallery =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}
  Vent: {}
  initialize: (data) ->
    #alert 'before router ctor'
    #new ArtistGallery.Routers.HomePageRouter()
    new ArtistGallery.Routers.AuthorsRouter(ArtistGallery.Collections)
    ArtistGallery.currentUser = new ArtistGallery.Models.CurrentUser(data.current_user)
    #alert 'after router ctor'
    Backbone.history.start()

    #alert 'after history start'



$(document).ready ->
  #alert 'before ready'
  ArtistGallery.initialize()
  #alert 'after ready'