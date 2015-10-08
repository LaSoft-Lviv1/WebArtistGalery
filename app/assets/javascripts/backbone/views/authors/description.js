var DescriptionView = Backbone.View.extend ({
	el: '.description',
	template: JST["backbone/templates/authors/description"],

	initialize: function () {
		this.render();
	},

	render: function () {
		this.$el.html(this.template());
		this.homeCarousel();
		return this;
	},

	homeCarousel: function() {
		$('.more').toggle(function(){
			$(this).text('less..').siblings('.complete').show();
		},
		function(){
			$(this).text('more..').siblings('.complete').hide();
		});
	}
});