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
    alert('Success')
#    ArtistGallery.Vent.trigger "user:logged_in", @model.get('id'), @model.get('username')

  renderError: ->
    alert('Error')
#    @$('.alert').html("Credentials are not valid").show()

  login: (e) ->
    e.preventDefault()
    @model.set email: @$('#email').val()
    @model.set password: @$('#password').val()
    @model.set remember_me: "0" #@$('#remember_me').val()
    console.log @model.toJSON()
    @model.save()

  signup: (e) ->
    e.preventDefault()
    @signupView = new SignupView()
    $(".modal-content").html(@signupView.render().el)

  render: =>
    @$el.html(@template())
    @

