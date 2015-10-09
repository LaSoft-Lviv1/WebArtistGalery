var UserCartView;
UserCartView = Backbone.View.extend ({
	template:  JST["backbone/templates/cart/cart"],

	initialize: function () {
		var counter = this.collection.toJSON().length;
		console.log(counter);
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