ArtistGallery.Views.HomePage ||= {}

class ArtistGallery.Views.HomePage.ArtItemView extends Backbone.View
  template: JST["backbone/templates/home_page/art_item"]

  className: 'col-xs-12 col-sm-6 col-md-4 col-lg-4 work_outer'

  events:
    "click button#add-to-cart" : "addToShoppingCart",
    "click button#delete" : "deleteArtItem"

  addToShoppingCart: () ->
    alert(@model.id)
    xhr = new XMLHttpRequest()
    artItemId = new FormData()
    artItemId.append("shopping_cart[art_item_id]", @model.id)
    xhr.open('post', 'shopping_carts', false)
    token = $('meta[name="csrf-token"]').attr('content')
    if (token)
      xhr.setRequestHeader('X-CSRF-Token', token)
    xhr.send(artItemId)

    counter = Number($('#counter').html()) + 1
    if counter > 0
      $('#counter').html(' ' + counter )
    @

  deleteArtItem: () ->
    alert('Delete' + @model.id)
    @model.destroy()
    @

  render: =>
    #alert 'in render addOne'
    @$el.html(@template(@model.toJSON()))
    @