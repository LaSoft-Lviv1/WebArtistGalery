var DetailedArtItemView;
DetailedArtItemView = Backbone.View.extend({
    template: JST['backbone/templates/art_item/detail_view'],

    events: {
    },

    initialize: function () {
    },

    render: function () {
        //alert('new tem render');
        console.log(this.model);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});
