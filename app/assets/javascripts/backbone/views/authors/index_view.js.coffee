ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.IndexView extends Backbone.View
  template: JST["backbone/templates/authors/index"]

  initialize: () =>
    #@collection.bind('reset', @addAll)
    console.log 'in initialize index view'
    @listenTo @art_item_collection, "reset", @addAllfromReset

  addAllfromReset: () =>
    console.log 'from reset'
    @addAll()

  addAll: () =>
    console.log 'in addAll start'
    console.log @collection.toJSON()
    console.log 'in addAll start'
    @collection.forEach @addOne, @
    @art_item_collection.forEach @addOneArtItemForArtistCarousel, @
    console.log 'in addAll finish'

  addOneArtItemForArtistCarousel: (art_item) =>
    console.log 'in addOneArtItem start'
    console.log art_item.toJSON()
    artItemArtistView = new ArtistGallery.Views.AboutArtist.ArtItemArtistView({model: art_item})
    @$(".variable-width").append(artItemArtistView.render().el)
    console.log 'in addOneArtItem finish'

  addOne: (author) =>
    console.log 'in addOne start'
    console.log author.toJSON()
    view = new ArtistGallery.Views.Authors.AuthorView({model: author})
    @$("tbody").append(view.render().el)
    console.log 'in addOne finish'

  render: =>
    console.log 'in render index view authors start'
    @collection.forEach @addOne, @
    @art_item_collection.forEach @addOneArtItemForArtistCarousel, @
    @$el.html(@template())
    console.log 'in render index view authors finish'
    @