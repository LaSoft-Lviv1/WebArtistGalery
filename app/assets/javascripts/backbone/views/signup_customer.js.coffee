class ArtistGallery.Views.SignupCustomer extends Backbone.View
  #  template: JST["backbone/templates/auth/login1"]
  template: JST["backbone/templates/signup_customer"]

#  initialize: () ->
#    console.log 'in loginView initialize'
  events:
    "click button": "signup"

  initialize: ->
    @listenTo @model, "error", @renderError
#    @listenTo @model, "sync", @triggerSignedIn

#  triggerSignedIn: ->
#    ArtistGallery.Vent.trigger "user:logged_in", @model.get('id'), @model.get('username')

  renderError: ->
#    @$('.alert').html("Credentials are not valid").show()

  signup: (e) ->
    e.preventDefault()
    @model.set email: @$('#email').val()
    @model.set password: @$('#password').val()
    @model.set password_confirmation: @$('#password_confirmation').val()
    console.log @model.toJSON()
    @model.save()

  render: =>
    alert 'before signup view'
    @$el.html(@template())
    @
