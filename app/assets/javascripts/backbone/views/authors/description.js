var DescriptionView = Backbone.View.extend ({
	template: JST["backbone/templates/authors/description"],

	initialize: function () {
	this.render();
},

	render: function () {
	$('.description').html( this.template() );
	$(".more").toggle(function(){
		$(this).text("less..").siblings(".complete").show();
		},
		function(){
		$(this).text("more..").siblings(".complete").hide();
});
	return this;
}
});