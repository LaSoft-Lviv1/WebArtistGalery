var UserCartView;
UserCartView = Backbone.View.extend ({
	template:  JST["backbone/templates/cart/cart"],

	initialize: function () {
		
		this.render(); 
		this.collection.each( this.addOne );
	},
	render: function () {
		$('#content').html( this.template() );
		return this;
	},
	addOne: function (cartModel) {
		var artItemCartView = new ArtItemCartView({model: cartModel});	
		$('tbody').append(artItemCartView.render())
		}
});