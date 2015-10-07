class ArtistGallery.Models.UserCartModel extends Backbone.Model
  urlRoot: 'shopping_carts'
 #  defaults: { 
 #  	'item': 'cart'
	# }
#defaults: ->

class ArtistGallery.Collections.CartCollection extends Backbone.Collection
  model: ArtistGallery.Models.UserCartModel
  url: 'shopping_carts'