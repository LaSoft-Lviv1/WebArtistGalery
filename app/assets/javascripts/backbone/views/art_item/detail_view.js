var DetailedArtItemView;
DetailedArtItemView = Backbone.View.extend({
    template: JST['backbone/templates/art_item/detail_view'],

    events: {
    },

    initialize: function () {
        console.log('details init.');
        this.styles = new ArtistGallery.Collections.StylesCollection();
        this.medias = new ArtistGallery.Collections.MediasCollection();
        this.subjects = new ArtistGallery.Collections.SubjectsCollection();
        this.authors = new ArtistGallery.Collections.AuthorsCollection();
        this.art_item = new ArtistGallery.Models.ArtItem();

        this.styles.fetch({
            reset: true
        });
        this.medias.fetch({
            reset: true
        });
        this.subjects.fetch({
            reset: true
        });

        this.authors.fetch({
            reset: true
        });
        this.listenTo(this.styles, "reset", this.fillStyles);
        this.listenTo(this.medias, "reset", this.fillMedias);
        this.listenTo(this.subjects, "reset", this.fillSubjects);
        this.listenTo(this.authors, "reset", this.fillAuthors);
        return
    },

    fillStyles: function () {
        var style = this.styles.get(this.model.toJSON().style_id);
        var name = style.toJSON().name;
        this.$("#art-item-style").html(name + ".");
    },

    fillMedias: function () {
        var media = this.medias.get(this.model.toJSON().media_id);
        var name = media.toJSON().name;
        this.$("#art-item-media").html(name + ".");
    },

    fillSubjects: function () {
        var subject = this.subjects.get(this.model.toJSON().subject_id);
        var name = subject.toJSON().name;
        this.$("#art-item-subject").html(name + ".");
    },

    fillAuthors: function () {
     //   var author = this.authors.get(this.model.toJSON().author_id);
        console.log(author);
        //author_id: null
        var first_name = author.toJSON().first_name;
        var second_name = author.toJSON().second_name;
        this.$("#art-item-author").html(first_name + ' ' + second_name + '.');
    },

    fillArtItem: function () {
        this.art_item.set({
            name: this.model.toJSON().name,
            description: this.model.toJSON().description,
            price: this.model.toJSON().price,
            vertical_size: this.model.toJSON().vertical_size,
            horizontal_size: this.model.toJSON().horizontal_size,
            source_file: this.model.toJSON().source_file
            //style: this.styles.get(this.model.toJSON().style_id).toJSON().name
        });
    },

    render: function () {
        console.log('new tem render');
        this.fillArtItem();
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
});
