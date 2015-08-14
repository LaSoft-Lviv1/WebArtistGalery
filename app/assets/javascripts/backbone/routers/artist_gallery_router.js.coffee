class ArtistGallery.Routers.ArtistGalleryRouter extends Backbone.Router
  routes:
    ''             : "index"
    'authors'      : "showAuthors"
    'authors/new'  : "newAuthor"
    'authors/:id'  : "show"
    ':id/edit'     : "edit"
    'index'        : "index"
    '.*'           : "index"

  initialize: ->
    @footerView = new FooterView
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    @art_items = new ArtistGallery.Collections.ArtItemsCollection()
    @art_items.fetch({ reset: true })
    @authors.fetch({ reset: true })

  showArtItemToJSON: ->
    console.log @art_items.toJSON()

  index: =>
    @headerView = new HeaderView()
    @homeView = new ArtistGallery.Views.HomePage.IndexView(collection: @art_items)
    $("#content").html(@homeView.render().el)

  showAuthors: =>
    @headerauthorsView = new HeaderAuthorsView()
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#content").html(@view.render().el)

  show: (id) =>
    author = @authors.get(id)
    @viewShow = new ArtistGallery.Views.Authors.ShowView(model: author)
    $("#content").html(@viewShow.render().el)


  newAuthor: ->
    @viewNewAuthor = new ArtistGallery.Views.Authors.NewView(collection: @authors)
    $("#content").html(@viewNewAuthor.render().el)
    console.log "after rendering"


  edit: (id) ->
    author = @authors.get(id)
    @view = new ArtistGallery.Views.Authors.EditView(model: author)
    $("#content").html(@view.render().el)