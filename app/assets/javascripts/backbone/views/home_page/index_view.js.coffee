ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.IndexView extends Backbone.View
  template: JST["backbone/templates/home_page/index"]

  initialize: () ->
    console.log 'in indexView initialize'
#    #@collection.bind('reset', @addAll)
#


  render: =>
    @$el.html(@template())
    #@addAll()
    @