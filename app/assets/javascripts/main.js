////Configure RequireJS
//requirejs.config({
//	paths: {
//		jquery           : 'lib/jquery-1.11.3.min',
//		bootstrap        : 'lib/bootstrap/js/bootstrap.min',
//		lazyload         : 'lib/jquery.lazyload.min',
//		jquery_migrate   : 'lib/jquery-migrate-1.2.1.min',
//		lightbox         : 'lib/lightbox2-master/dist/js/lightbox-plus-jquery.min',
//		slick            : 'slick/slick.min',
//		underscore       : 'lib/underscore',
//		backbone         : 'lib/backbone',
//		text             : 'lib/text/text',
//		//header_resize    : 'js_manual/header_resize',
//
//		// our views
//		header           : 'header',
//		footer           : 'footer'
//		//gallery: 'gallery',
//		//painting: 'painting'
//	},
//
//	shim: {
//		backbone         : { exports: 'Backbone', deps: ['jquery', 'underscore'] },
//		underscore       : { exports: '_' },
//		bootstrap        : { exports: 'Bootstrap',deps: ['jquery'] },
//		lazyload         : { deps: ['jquery'] },
//		jquery_migrate   : { deps: ['jquery'] },
//		lightbox         : { deps: ['jquery'] },
//		slick            : { deps: ['jquery'] },
//		header           : { deps: ['jquery', 'bootstrap', 'backbone']},
//		header_resize    : { deps: ['jquery'] }
//		}
//});
//
//require(['jquery',
//		 'bootstrap',
//		 'lazyload',
//		 'jquery_migrate',
//		 'lightbox',
//		 'slick',
//		 'underscore',
//		 'backbone',
//		 'text',
//		 'header',
//		 'header_resize',
//		 'footer'
//		 ], function (app) {
//		 	// app.initialize();
//});