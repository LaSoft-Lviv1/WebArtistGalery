class ArtistGallery.Routers.AuthorsRouter extends Backbone.Router
  routes:
    ''             : "index"
    'authors'      : "showAuthors"
    'authors/new'  : "newAuthor"
    'authors/:id'  : "show"
    'login'        : "login"
    'logout'       : "logout"
    'signup'       : "signup"

#".*"       : "index"

#  "index"    : "index"
#  ":id/edit" : "edit"
  signup: ->
    @view = new ArtistGallery.Views.Signup({ model: new ArtistGallery.Models.Registration() })
    $("#authors").html(@view.render().el)

  logout: ->
#    m = new ArtistGallery.Models.Login()
#    m.destroy()
#    console.log 'Logout!'
#    alert "Logout!"
    ArtistGallery.Vent.trigger "user:logged_out"

  login: ->
    @view = new ArtistGallery.Views.Login({ model: new ArtistGallery.Models.Login() })
    $("#authors").html(@view.render().el)

  initialize: ->
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    @variable = 5
    console.log 'in router initialize'
    console.log @variable
    @authors.fetch({ reset: true })
    #@listenTo @authors, "reset", @index

    #@authors.reset options.authors

  index1: ->
    console.log 'in index second'
    @indexView = new ArtistGallery.Views.HomePage.IndexView()
    console.log 'after indexView'
    $("#authors").html(@indexView.render().el)


  index: ->
    console.log @variable
    @variable = 7
    console.log @variable
    console.log 'in index'
    #alert "in index"
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#authors").html(@view.render().el)
    console.log "in index authors_router"
    console.log ( @authors.toJSON())

    console.log 'after index authors_router'


  showAuthors: ->

    this.authors.fetch({ reset: true })
    console.log 'in show authors'
    #alert "in index"
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    console.log @authors.toJSON()
    console.log 'before rendering'
    $("#authors").html(@view.render().el)



  show: (id) =>
    console.log('show')
    @variable = 10
    console.log @authors.toJSON()
    author = @authors.get(id)
    @viewShow = new ArtistGallery.Views.Authors.ShowView(model: author)
    $("#authors").html(@viewShow.render().el)
    #$("#authors").html("<p>kkk</p>")

  newAuthor: ->
    console.log 'in router new author'
    @viewNewAuthor = new ArtistGallery.Views.Authors.NewView(collection: @authors)
    console.log "after constructor view"
    $("#authors").html(@viewNewAuthor.render().el)
    console.log "after rendering"

#edit: (id) ->
#  author = @authors.get(id)
#
#  @view = new ArtistGallery.Views.Authors.EditView(model: author)
#  $("#authors").html(@view.render().el)