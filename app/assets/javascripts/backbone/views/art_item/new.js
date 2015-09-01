var AddArtItemView = Backbone.View.extend({
    template: JST['backbone/templates/art_item/new'],

    initialize: function() {
        this.render();
    },

    render: function() {
        $('#content').html(this.template());
        return this;
    }

});
