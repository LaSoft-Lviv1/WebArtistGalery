class ArtistGallery.Routers.HomePageRouter extends Backbone.Router
  routes:
    ''         : "index"
    "login"    : "login"

  login: ->
    @view = new ArtistGallery.Views.Login({ model: new ArtistGallery.Models.Login() })
    $("#contents").html(@view.render().el)


  initialize: () ->

    #alert 'from home'
    #@authors = new ArtistGallery.Collections.AuthorsCollection()
    #@authors.reset options.authors

  show: (id) ->
    alert "artist #{id}"

  index: ->
    @view = new ArtistGallery.Views.HomePage.IndexView()
    $("#contents").html(@view.render().el)