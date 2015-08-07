class ArtistGallery.Models.Registration extends Backbone.Model
  url: '/users.json',
  paramRoot: 'user',

  defaults: {
    "email": "",
    "password": "",
    "password_confirmation": ""
  }

