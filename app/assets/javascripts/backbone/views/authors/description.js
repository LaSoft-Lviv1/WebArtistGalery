var DescriptionView = Backbone.View.extend ({
	el: '.description',
	template: JST["backbone/templates/authors/description"],

	initialize: function () {
        //console.log(this.model.toJSON());
		this.render();
	},

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		this.aboutAuthorInfo();
		return this;
	},

    aboutAuthorInfo: function() {

		$('.more').toggle(function(){
			$(this).text('less..').siblings('.complete').show();
		},
		function(){
			$(this).text('more..').siblings('.complete').hide();
		});
	}
});