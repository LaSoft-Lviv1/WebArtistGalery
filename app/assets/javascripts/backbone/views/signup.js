var SignupView = Backbone.View.extend ({
	template: JST["backbone/templates/signup"],

    events: {
        'click .artist': 'artistSignup',
        'click #customer': 'customerSignup',
    },

	initialize: function () {
	this.render();
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

    render: function () {
	$('.modal-content').html( this.template() );

	return this;
    }
});