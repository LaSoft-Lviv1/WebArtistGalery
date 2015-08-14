ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.IndexView extends Backbone.View
  template: JST["backbone/templates/home_page/index"]

  initialize: =>
    console.log 'in home page index view initialize'
    @listenTo @collection, "reset", @addAllFromReset

  addToCollection: (model) ->
    @collection.add model

  addAllFromReset: =>
    console.log 'from reset'
    @addAll()

  addAll: () =>
    console.log 'in addAll start'
    console.log @collection.toJSON()
    console.log 'in addAll start'
    @collection.forEach @addOneArtItemForHomePage, @
    @collection.forEach @addOneArtItemForCarousel, @
    console.log 'in addAll finish'


  addOneArtItemForHomePage: (art_item) =>
    console.log 'in addOneArtItem start'
    console.log art_item.toJSON()
    viewOneArtItem = new ArtistGallery.Views.HomePage.ArtItemView({model: art_item})
    @$(".container-fluid").append(viewOneArtItem.render().el)
    console.log 'in addOneArtItem finish'


  addOneArtItemForCarousel: (art_item) =>
    console.log 'in addOneArtItem start'
    console.log art_item.toJSON()
    viewOneArtItem = new ArtistGallery.Views.HomePage.PaintingForCarouselView({model: art_item})
    @$(".variable-width").append(viewOneArtItem.render().el)
    console.log 'in addOneArtItem finish'


  render: =>
    console.log 'in render'
    console.log @collection.toJSON()
    @$el.html(@template())
    @collection.forEach @addOneArtItemForHomePage, @
    @collection.forEach @addOneArtItemForCarousel, @
    console.log 'in render index view art_item finish'
    @



#  render: ->
##alert 'render issue'
#    @$el.html(@template({ count: @collection.length }))
#    @collection.forEach @renderIssue, @
#    @
#
#  renderIssue: (model) ->
##alert 'render concrete issue'
##alert(JSON.stringify(model))
#    v = new App.Views.Issue({ model: model})
#    @childViews.push(v)
#    #alert(JSON.stringify(v))
#    @$('#issues_list').append(v.render().el)


#  renderDetails: ->
#    @$el.html(@template(@model.toJSON()))
#    alert 'ok'
#    alert(JSON.stringify(@model.get('issues')))
#    v = new App.Views.Issues({ collection: @model.get('issues')})
#    @childViews.push(v)
#    @$('#issues').html(v.render().el)



