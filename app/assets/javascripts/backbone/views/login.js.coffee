#ArtistGallery.Views.Login ||= {}

class ArtistGallery.Views.Login extends Backbone.View
#  template: JST["backbone/templates/auth/login1"]
  template: JST["backbone/templates/mylogin"]

#  initialize: () ->
#    console.log 'in loginView initialize'
  events:
    "click button": "login"

  initialize: ->
    @listenTo @model, "error", @renderError
    @listenTo @model, "sync", @triggerLoggenIn

  triggerLoggenIn: ->
    App.Vent.trigger "user:logged_in", @model.get('id'), @model.get('username')

  renderError: ->
    @$('.alert').html("Credentials are not valid").show()

  login: (e) ->
    e.preventDefault()
    @model.set username: @$('#email').val()
    @model.set password: @$('#password').val()
    @model.save()

  render: =>
    alert 'before login view'
    @$el.html(@template())
    #@addAll()
    @
#    $("#authors").html("<p>Login</p>")
#    $("#authors").append(@template())
#    alert 'from login view'
    #@addAll()

