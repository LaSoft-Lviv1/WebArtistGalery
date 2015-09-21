var ArtistAdminView = Backbone.View.extend ({
	
	template: JST['backbone/templates/authors/artist_admin'],

	// this.events = {
	// 	'click div.upload-art':'changeLocation'
	// },

	initialize: function () {
		this.render();
	},

	render: function () {
		$('#content').html( this.template() );
		return this;
	}

	// changeLocation: function () {
	//   var location = window.location.href;
 //    var locationTemplate = location.slice(0, location.indexOf('untitled'));
 //    locationTemplate += 'add-art-item-page.html';
 //    window.open(locationTemplate, '_self');
	// }

});