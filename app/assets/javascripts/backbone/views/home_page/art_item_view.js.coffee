ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.ArtItemView extends Backbone.View
  template: JST["backbone/templates/home_page/art_item"]

  className: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 work_outer'

  render: =>
#alert 'in render addOne'
    @$el.html(@template(@model.toJSON()))
    return this