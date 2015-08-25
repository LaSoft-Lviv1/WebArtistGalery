class ArtistGallery.Views.Signup extends Backbone.View
  template: JST["backbone/templates/signup"]

  events:
    "click .customer": "artistSignup"
    "click .artist": "artistSignup"

  initialize: ->
    alert('signup init')

  signup: (e) ->
    e.preventDefault()
    alert('123')
#    @view = new ArtistGallery.Views.SignupArtist()
    @view = new ArtistGallery.Views.SignupCustomer()
    $(".modal-content").html(@view.render().el)
#    signupView = new SignupView()
    alert('123')

  artistSignup: (e) ->
    e.preventDefault()
#    signupView = new SignupView()
    alert('cust')

  render: =>
    #alert 'before login view'
    @$el.html(@template())
    #@addAll()
    @

