ArtistGallery.Views.Authors ||= {}

class ArtistGallery.Views.Authors.AuthorView extends Backbone.View
  template: JST["backbone/templates/authors/author"]

  events:
    "click .destroy" : "destroy"

  tagName: "tr"

  destroy: () ->
    @model.destroy()
    this.remove()

    return false

  render: =>
    #alert 'in render addOne'
    #@$el.html(@template(@model.toJSON() ))
    #@$("table").html("<p>@template(@model.toJSON()</p>" )
    @$el.html(@template(@model.toJSON()))
    return this
