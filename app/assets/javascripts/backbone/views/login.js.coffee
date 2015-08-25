#ArtistGallery.Views.Login ||= {}

class ArtistGallery.Views.Login extends Backbone.View
  template: JST["backbone/templates/mylogin1"]

  events:
    "click button.login": "login"
    "click button.signup": "signup"

  initialize: ->
    @listenTo @model, "error", @renderError
    @listenTo @model, "sync", @triggerLoggenIn

  triggerLoggenIn: ->
    ArtistGallery.Vent.trigger "user:logged_in", @model.get('id'), @model.get('username')

  renderError: ->
    @$('.alert').html("Credentials are not valid").show()

  login: (e) ->
    e.preventDefault()
    @model.set email: @$('#email').val()
    @model.set password: @$('#password').val()
    @model.set remember_me: "0" #@$('#remember_me').val()
    console.log @model.toJSON()
    @model.save()

  signup: (e) ->
    e.preventDefault()
    alert('123')
    @signupView = new SignupView()
    $(".modal-content").html(@signupView.render().el)
    alert('123')

  render: =>
    #alert 'before login view'
    @$el.html(@template())
    #@addAll()
    @
#    $("#authors").html("<p>Login</p>")
#    $("#authors").append(@template())
#    alert 'from login view'
    #@addAll()

