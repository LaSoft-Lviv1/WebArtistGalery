class ArtistGallery.Routers.AuthorsRouter extends Backbone.Router
  routes:
    ''    : "index"
    ':id'      : "show"
    #".*"       : "index"
#  "new"      : "newAuthor"
#  "index"    : "index"
#  ":id/edit" : "edit"
#  ":id"      : "show"


  initialize: (options) ->
    #alert 'kk'
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    @authors.fetch({ reset: true })
    alert "after initialize"
    #@authors.reset options.authors

  show: (id) ->
    alert 'in show'
    alert "artist #{id}"

  index: ->
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    #@view = new ArtistGallery.Views.Authors.IndexView()
    #$("#authors").html('<h1>hello from authors</h1>')
    alert JSON.stringify(@authors)
    $("#authors").html(@view.render().el)


#  show: (id) ->
#     alert 'in show'
#  author = @authors.get(id)

#  @view = new ArtistGallery.Views.Authors.ShowView(model: author)
#  $("#authors").html(@view.render().el)

#edit: (id) ->
#  author = @authors.get(id)
#
#  @view = new ArtistGallery.Views.Authors.EditView(model: author)
#  $("#authors").html(@view.render().el)