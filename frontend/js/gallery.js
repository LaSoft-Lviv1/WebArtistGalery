define([
	'painting'
	], function(PaintingView){
	var Gallery = {
		init: function() {
			var paintingView = new PaintingView({el: '.container'});
			paintingView.render();
		}
	};
	return Gallery;
});

