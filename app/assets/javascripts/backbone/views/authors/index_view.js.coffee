ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.IndexView extends Backbone.View
  template: JST["backbone/templates/authors/index"]
  #tagName: "tbody"

  #id: "authors"

  className: 'myView'

  #el: 'body'

  #events:
    #"click a.btn": "newProject"

  initialize: () =>
    #@collection.bind('reset', @addAll)
    console.log 'in initialize index view'
    @listenTo @collection, "reset", @addAllfromReset
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


  addAllfromReset: () =>
    console.log 'from reset'
    @addAll()

  addAll: () =>
    console.log 'in addAll start'
    console.log @collection.toJSON()
    console.log 'in addAll start'
    #@collection.each(@addOne)
    @collection.forEach @addOne, @
    console.log 'in addAll finish'


  addOne: (author) =>
    console.log 'in addOne start'
    console.log author.toJSON()
    view = new ArtistGallery.Views.Authors.AuthorView({model: author})
    @$("tbody").append(view.render().el)
    console.log 'in addOne finish'


  render: =>
    console.log 'in render index view authors start'
    console.log @collection.toJSON()
    console.log 'in render index view authors start'
    #@addAll()
    @$el.html(@template( ))
    #@addAll
    @collection.forEach @addOne, @
    console.log 'in render index view authors finish'
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



#  newProject: (e) ->
#    e.preventDefault()
#    App.Vent.trigger "project:new"




