define([
	'backbone'], function(Backbone){
	var PaintingView = Backbone.View.extend({
		initialize: function() {
			console.log('hello');
		},

		render: function() {
			console.log('hello2', this);
			this.$el.html('<h1>Hello world!</h1>');
			$('.bbb').append('<p>fffffffffffff<p>');
			return this;
		}
	});
	return PaintingView;
});