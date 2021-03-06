var UserCartView;
UserCartView = Backbone.View.extend ({
	template:  JST["backbone/templates/cart/cart"],

	initialize: function () {
		console.log(this.collection.toJSON()[0]);
		var counter = this.collection.toJSON().length;
		if (counter !== 0) {
			$('#counter').html(' ' + counter );
		}

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