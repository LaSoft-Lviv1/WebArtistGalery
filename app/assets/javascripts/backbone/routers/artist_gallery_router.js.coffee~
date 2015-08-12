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
    @headerView = new HeaderView();
    @footerView = new FooterView();
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    @art_items = new ArtistGallery.Collections.ArtItemsCollection()
    console.log 'in router initialize'
    @art_items.fetch({ reset: true })
    @authors.fetch({ reset: true })
    console.log 'after initialize router'
    #@listenTo @art_items, "reset", @showArtItemToJSON
    #@listenTo @authors, "reset", @index

    #@authors.reset options.authors

  showArtItemToJSON: ->
    console.log @art_items.toJSON()

  index: =>
    console.log 'in index second'
#    @headerView = new HeaderView();
#    @footerView = new FooterView();

    @homeView = new ArtistGallery.Views.HomePage.IndexView(collection: @art_items)
    console.log 'after homeView'
    #@headerView.render().el
    #@footerView.render().el
    $("#content").html(@homeView.render().el)


  index1: ->
    console.log 'in index authors_router before render'
    console.log @authors.toJSON()
    console.log 'in index authors_router before render'
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#content").html(@view.render().el)
    console.log "in index authors_router after render"
    console.log ( @authors.toJSON() )
    console.log 'in index authors_router after render'


  showAuthors: =>

    console.log 'in show authors before create index view'
    console.log @authors.toJSON()
    console.log 'in show authors before create index view'
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    console.log 'in show authors after create index view'
    console.log @authors.toJSON()
    console.log 'in show authors after create index view before rendering'

    $("#content").html(@view.render().el)

    console.log 'in show authors after create index view after rendering'



  show: (id) =>
    console.log 'in show one author'
    console.log @authors.toJSON()
    console.log 'in show one author'
    author = @authors.get(id)
    @viewShow = new ArtistGallery.Views.Authors.ShowView(model: author)
    $("#content").html(@viewShow.render().el)


  newAuthor: ->
    console.log 'in router new author'
    @viewNewAuthor = new ArtistGallery.Views.Authors.NewView(collection: @authors)
    console.log "after constructor view"
    $("#content").html(@viewNewAuthor.render().el)
    console.log "after rendering"


  edit: (id) ->
    author = @authors.get(id)
    @view = new ArtistGallery.Views.Authors.EditView(model: author)
    $("#content").html(@view.render().el)