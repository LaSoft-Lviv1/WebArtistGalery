class ArtistGallery.Routers.ArtistGalleryRouter1 extends Backbone.Router
  routes:
    ''             : "index"
    'authors'      : "showAuthors"
    'authors/new'  : "newAuthor"
    'authors/:id'  : "show"
    ':id/edit'     : "edit"
    'index'        : "index"
    'login'        : "login"
    'logout'       : "logout"
    'signup'       : "signup"
    '.*'           : "index"

  initialize: ->
    @carouselscriptView = new CarouselscriptView()
    @morelessView = new MorelessView()
    @footerView = new FooterView
    @authors = new ArtistGallery.Collections.AuthorsCollection()
    @authors.fetch({ reset: true })

  showArtItemToJSON: ->
    console.log @art_items.toJSON()

  index: =>
    @headerView = new HeaderView()
    @view = new ArtistGallery.Views.Login({ model: new ArtistGallery.Models.Login() })
    $(".modal-content").html(@view.render().el)
    @art_items = new ArtistGallery.Collections.ArtItemsCollection()
    @art_items.fetch({ reset: true })
    @homeView = new ArtistGallery.Views.HomePage.IndexView(collection: @art_items)
    $("#content").html(@homeView.render().el)
    alert('123')
    @carouselscriptView = new CarouselscriptView()

  signup: ->
    @view = new ArtistGallery.Views.Signup({ model: new ArtistGallery.Models.Registration() })
    $("#content").html(@view.render().el)

  login: ->
    @view = new ArtistGallery.Views.Login({ model: new ArtistGallery.Models.Login() })
    $(".modal-content").html(@view.render().el)

  showAuthors: =>
    @headerauthorsView = new HeaderAuthorsView()
    @view = new ArtistGallery.Views.Login({ model: new ArtistGallery.Models.Login() })
    $(".modal-content").html(@view.render().el)
    @view = new ArtistGallery.Views.Authors.IndexView(collection: @authors)
    $("#content").html(@view.render().el)
    @morelessView = new MorelessView()
    @carouselscriptView = new CarouselscriptView()

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