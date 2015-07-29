ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.IndexView extends Backbone.View
  template: JST["backbone/templates/authors/index"]

  #events:
    #"click a.btn": "newProject"

  initialize: () ->
    @collection.bind('reset', @addAll)
    console.log 'in initialize index view'
    console.log 'in collection'
    #console.log @collection.toJSON()
    #@listenTo @collection, "reset", @addAll
    #@listenTo App.Vent, "project:create", @addToCollection
    #@listenTo @collection, "add", @renderProject
    #@collection.fetch({ reset: true })

  addToCollection: (model) ->
    @collection.add model

#  render: ->
#    @$el.html(@template())
#    @collection.forEach @renderProject, @
#    @


#  renderAuthor: (model) ->
#    view = new App.Views.Project({ model: model })
#    @$('ul').append(view.render().el)

  addAll: () =>
    console.log 'in addAll'
    @collection.each(@addOne)

  addOne: (author) =>
    console.log 'in addOne'
    console.log author.toJSON()
    view = new ArtistGallery.Views.Authors.AuthorView({model: author})
    @$("tbody").append(view.render().el)

  render: ->
    console.log 'in view render'
    console.log @collection.toJSON()
    @$el.html(@template(authors: @collection.toJSON() ))
    #@addAll()
    @





#  newProject: (e) ->
#    e.preventDefault()
#    App.Vent.trigger "project:new"




