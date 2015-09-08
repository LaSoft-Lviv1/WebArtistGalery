class ArtistGallery.Models.Subject extends Backbone.Model
  urlRoot: 'subjects'

#defaults: ->

class ArtistGallery.Collections.SubjectsCollection extends Backbone.Collection
  model: ArtistGallery.Models.Subject
  url: 'subjects'