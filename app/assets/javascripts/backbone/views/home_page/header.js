var HeaderView = Backbone.View.extend ({
	el: '#header',
	template: JST["backbone/templates/home_page/header"],

	events: {
		'click #mynavbar ul li': 'activeHeaderLinks'
	},

    initialize: function () {
		this.render();
		var counter = this.collection.toJSON().length;
		console.log(counter);
		if (counter !== 0) {
			this.$('#counter').append(' ' + counter );
		}
	},

	render: function () {
		this.$el.html(this.template());
		this.activeHeaderLinksOnload();
		return this;
	},

	activeHeaderLinks: function(e) {
		$('#mynavbar ul li').removeClass('active');
		$(e.currentTarget).addClass('active');
	},

	activeHeaderLinksOnload: function() {
		var pathArray = window.location.href.split('/'),
			pathcheck = pathArray[3];
		$('#mynavbar ul li').removeClass('active');
		if (pathcheck == '#' || pathcheck == '') {
			$('.header_link_home').addClass('active');
		} else if (pathcheck == '#authors') {
			$('.header_link_authors').addClass('active');
		} else if (pathcheck == '#howToBuy') {
			$('.header_link_howtobuy').addClass('active');
		}
	},

});