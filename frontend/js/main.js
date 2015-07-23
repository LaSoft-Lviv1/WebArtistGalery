//Configure RequireJS
requirejs.config({
	baseUrl: "js",
	paths: {
		jquery: 'lib/jquery-1.11.3.min',
		underscore: 'lib/underscore',
		backbone: 'lib/backbone',
		bootstrap: 'lib/bootstrap/js/bootstrap.min',
		lazyload: 'jquery.lazyload.min',


		// our views
		gallery: 'gallery',
		painting: 'painting'
	},

	shim: {
		backbone: {exports: 'Backbone', deps: ['jquery', 'underscore']},
		underscore: {exports: '_'},
		'foo': {
            deps: ['bar'],
            exports: 'Foo',
            init: function (bar) {
                return this.Foo.noConflict();
            }
        },
		bootstrap: {deps: ['jquery']},
	}
});
require(['gallery'], function(Gallery){
	Gallery.init();
});

