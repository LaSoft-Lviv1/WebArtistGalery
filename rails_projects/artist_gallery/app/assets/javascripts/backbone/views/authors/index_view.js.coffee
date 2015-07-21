ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.IndexView extends Backbone.View
  template: JST["backbone/templates/authors/index"]

  initialize: () ->
    #@collection.bind('reset', @addAll)

  addAll: () =>
    @collection.each(@addOne)

  addOne: (author) =>
    view = new ArtistGallery.Views.Authors.AuthorView({model : author})
    @$("tbody").append(view.render().el)

  render: ->
    #@$el.html(@template(authors: @collection.toJSON() ))
    @$el.html(@template())
    #@addAll()

    return this

#  render: ->
#    alert 'render'
#    $(@el).html(@template())
#    @
