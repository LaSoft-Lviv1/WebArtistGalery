ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.NewView extends Backbone.View
  template: JST["backbone/templates/authors/new"]

  events:
    "submit #new-author": "save"
    "change #city_name" : "set_id"

  constructor: (options) ->
    #console.log 'first step'
    super(options)
    @model = new @collection.model()
    console.log @model
    @model.bind("change:errors", () =>
      this.render()
    )

  initialize: ->
    @listenTo @cities, "reset", @render


  set_id: ( option ) ->
    #alert ("in set id")
    #console.log @$("select option:selected").attr("city_id")

    @$("#text_city_id").val((@$("select option:selected").attr("city_id")))

  save: (e) ->
    console.log 'in save method'
    e.preventDefault()
    e.stopPropagation()

    @model.unset("errors")

    @collection.create(@model.toJSON(),
      success: (author) =>
        @model = author
        window.location.hash = "/#{@model.id}"

      error: (author, jqXHR) =>
        @model.set({errors: $.parseJSON(jqXHR.responseText)})
    )

  addCityList: ->
    console.log 'in addCityList'
    @cities = new ArtistGallery.Collections.CitiesCollection()
    @cities.fetch({reset: true})
    alert("OK")
    console.log @cities.toJSON()
    @cities.each(@addCity)

  addCity: (city) =>
    #console.log city.toJSON().name


    city_name = city.toJSON().name
    city_id = city.toJSON().id
    #console.log city_name

    @$("#city_name").append("<option city_id=" + city_id + ">" + city_name + "</option>")

  render: ->
    console.log 'in render new view'
    @$el.html(@template())
    console.log 'after render new template before adding cities'
    @addCityList()

    #@$el.html(@template(@model.toJSON() ))

    #this.$("form").backboneLink(@model)

    return this
