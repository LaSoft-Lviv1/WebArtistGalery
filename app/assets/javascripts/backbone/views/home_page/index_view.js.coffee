ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.IndexView extends Backbone.View
  template: JST["backbone/templates/home_page/index"]

  initialize: () ->
    console.log 'in indexView initialize'
#    #@collection.bind('reset', @addAll)
#
#  addAll: () =>
#    @collection.each(@addOne)
#
#  addOne: (author) =>
#    view = new ArtistGallery.Views.Authors.AuthorView({model : author})
#    @$("tbody").append(view.render().el)

  render: =>
    @$el.html(@template())
    #@addAll()
    @