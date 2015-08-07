var HeaderView = Backbone.View.extend ({
	template: JST["backbone/templates/home_page/header"],
	//template: _.template(template),


	initialize: function () {
	this.render();
},

	render: function () {
	$('#header').html( this.template() );

	return this;
}
});

//var headerView = new HeaderView();
