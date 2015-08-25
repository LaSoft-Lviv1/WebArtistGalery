var HeaderView = Backbone.View.extend ({
	template: JST["backbone/templates/home_page/header"],

    events: {
        'click button.artist':'artistSignup',
        'click button#customer': 'customerSignup',
    },

    artistSignup: function (e) {
        e.preventDefault();
        //$('.modal-content').html( this.template() );
        alert('artist');
        return this;
    },

    customerSignup: function (e) {
        e.preventDefault();
        //$('.modal-content').html( this.template() );
        alert('customer');
        return this;
    },


    initialize: function () {
	this.render();
},

	render: function () {
	$('#header').html( this.template() );

	return this;
}
});