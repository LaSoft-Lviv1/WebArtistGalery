class ArtistGallery.Models.CurrentUser extends Backbone.Model

  initialize: ->
    @listenTo ArtistGallery.Vent, "user:logged_in", @login
    @listenTo ArtistGallery.Vent, "user:logged_out", @logout

  login: (id, username) ->
    @set id: id, username: username, loggedIn: true

  logout: ->
    m = new ArtistGallery.Models.Login({ id: @id })
    m.destroy
      success: (model, data) =>
        @set loggedIn: false
        delete @id
        delete @attributes.username
        delete @attributes.id
        window.csrf(data.csrf)
