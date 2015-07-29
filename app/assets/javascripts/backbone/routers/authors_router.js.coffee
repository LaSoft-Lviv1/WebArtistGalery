class ArtistGallery.Routers.AuthorsRouter extends Backbone.Router
  routes:
    ''             : "index"
    'authors'      : "showAuthors"
    'authors/new'  : "newAuthor"
    'authors/:id'  : "show"
    #".*"       : "index"

#  "index"    : "index"
#  ":id/edit" : "edit"


  initialize: (options) ->
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    console.log 'in router initialize'

    @authors.reset options.authors

  index: ->
    console.log 'in index second'
    @indexView = new ArtistGallery.Views.HomePage.IndexView()
    console.log 'after indexView'
    $("#authors").html(@indexView.render().el)


  index1: ->
    @authors.fetch({ reset: true })
    console.log 'in index'
    #alert "in index"
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#authors").html(@view.render().el)
    console.log 'after index'
    #console.log @authors.toJSON()

  showAuthors: ->
    @authors.fetch({ reset: true })
    console.log 'in show authors'
    #alert "in index"
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#authors").html(@view.render().el)



  show: (id) ->
    author = @authors.get(id)
    @view = new ArtistGallery.Views.Authors.ShowView(model: author)
    $("#authors").html(@view.render().el)

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