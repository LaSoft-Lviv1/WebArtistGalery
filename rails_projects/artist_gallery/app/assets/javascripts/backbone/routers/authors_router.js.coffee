class ArtistGallery.Routers.AuthorsRouter extends Backbone.Router
  routes:
    ''        : "index"
    ':id'     : "show"
    #".*"       : "index"
#  "new"      : "newAuthor"
#  "index"    : "index"
#  ":id/edit" : "edit"
#  ":id"      : "show"

  initialize: (options) ->
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    console.log 'in router initialize'

    @authors.reset options.authors


  index: ->
    @authors.fetch({ reset: true })
    console.log 'in index'
    #alert "in index"
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#authors").html(@view.render().el)
    console.log 'after index'
    #console.log @authors.toJSON()


  show: (id) ->
    author = @authors.get(id)
    @view = new ArtistGallery.Views.Authors.ShowView(model: author)
    $("#authors").html(@view.render().el)

#edit: (id) ->
#  author = @authors.get(id)
#
#  @view = new ArtistGallery.Views.Authors.EditView(model: author)
#  $("#authors").html(@view.render().el)