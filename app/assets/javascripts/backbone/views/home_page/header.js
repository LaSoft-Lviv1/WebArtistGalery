var HeaderView = Backbone.View.extend ({
	template: JST["backbone/templates/home_page/header"],

    initialize: function () {
	this.render();
},

	render: function () {
		$('#header').html( this.template() );
		$('#mynavbar ul li').click(function() {
			if ($(this).is('.home_link_header')) {
				$('#mynavbar ul li').removeClass('active');
				$('.home_link_header').addClass('active');
			} else if ($(this).is('.artist_link_header')) {
				$('#mynavbar ul li').removeClass('active');
				$('.artist_link_header').addClass('active');
			} else if ($(this).is('.howtobuy_link_header')) {
				$('#mynavbar ul li').removeClass('active');
				$('.howtobuy_link_header').addClass('active');
			}
		});

		var pathArray = window.location.href.split('/'),
			pathcheck = pathArray[3];

		var pathCheck = function() {
			if (pathcheck == '#' || pathcheck == '') {
				$('.home_link_header').addClass('active');
			} else if (pathcheck == '#authors') {
				$('.artist_link_header').addClass('active');
			} else if (pathcheck == '#howToBuy') {
				$('.howtobuy_link_header').addClass('active');
			}
		};
		pathCheck();

	return this;
},

});