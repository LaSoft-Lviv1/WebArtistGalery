$('.variable-width').slick({
	dots: true,
	infinite: true,
	speed: 300,
	slidesToShow: 1,
	centerMode: true,
	variableWidth: true
});

$(".lazy").lazyload({threshold: -100, effect: "fadeIn"});

$(".more").toggle(function(){
		$(this).text("less..").siblings(".complete").show();
		},
		function(){
		$(this).text("more..").siblings(".complete").hide();
});