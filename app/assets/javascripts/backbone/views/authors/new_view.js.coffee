ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.NewView extends Backbone.View
  template: JST["backbone/templates/authors/new"]

  events:
    "submit #new-author": "save"
    "change #city_name" : "set_id"
    "change #fileupload": "show_image"

  constructor: (options) ->
    super(options)
    @model = new @collection.model()
    console.log @model
    @model.bind("change:errors", () =>
      this.render()
    )

  initialize: ->
    @listenTo @cities, "reset", @render

  show_image:(e) =>
    reader = new FileReader()
    reader.onload = (event) =>
      img     = new Image()
      img.src = event.target.result
      @$("div#image_preview img").remove()
      @$("#image_preview").append(img)

    reader.onerror = (event) =>
      alert("Файл не может быть прочитан! код " + event.target.error.code)

    reader.readAsDataURL(e.target.files[0])


  set_id: ( option ) ->
    @$('#image_preview').append("<p>new city</p>")
    @$("#text_city_id").val((@$("select option:selected").attr("city_id")))


#  saveFile: (e) ->
#    picture = $('input[name="fileInput"]')[0].files[0];
#    data = new FormData();
#    data.append('file', picture);
#    $.ajax(
#     url: '/authors'+this.model.get("picture data: data,
#     cache: false, contentType: false,
#        processData: false,
#        type: 'POST'",
#          success: =>
#           $('#loadingModal').modal('hide')
#
#          error: =>
#            alert('no upload')
#            $('#loadingModal').modal('hide')
#      )
#    )

#  upload:=>
#    @$el.fileupload
#    add: (e, data)->
#      $('#qrcode_image').hide()
#      $("#fileupload-loading").html 'Cargando...'
#      data.submit()
#    formData: [
#      name: 'authenticity_token'
#      value: $("meta[name=\'csrf-token\']").attr('content')
#    ]
#  done: (e, data) ->
#    window.location = '/'

  save: (e) ->
    console.log 'in save method'
    e.preventDefault()
    e.stopPropagation()

    @model.unset("errors")

    fileForm = new FormData()
    fileForm.append("author[photo]", @$("#fileupload").files[0])

    #отправляем через xhr
    xhr = new XMLHttpRequest()
    xhr.onload = () ->
     console.log("Отправка завершена")

    xhr.open("post", "authors", true)
    xhr.send(fileForm)

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

    @$("#city_name").append("<option city_id=" + city_id + ">" + \
        city_name + "</option>")

  render: ->
    console.log 'in render new view'
    @$el.html(@template())
    console.log 'after render new template before adding cities'
    @addCityList()

    #@$el.html(@template(@model.toJSON() ))

    #this.$("form").backboneLink(@model)

    return this
