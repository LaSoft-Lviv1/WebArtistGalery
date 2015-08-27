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
    var user_email = ArtistGallery.LoginHelpers.getCookie('user_email');
        console.log(user_email);
	$('#header').html( this.template(user_email) );

	return this;
}
});