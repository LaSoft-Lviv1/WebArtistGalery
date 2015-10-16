var EditArtItemView;
EditArtItemView = Backbone.View.extend({
    template: JST['backbone/templates/art_item/edit'],

    events: {
        'click #submit': 'editArtItem',
    },

    initialize: function () {
        this.categories = new ArtistGallery.Collections.CategoriesCollection();
        this.styles = new ArtistGallery.Collections.StylesCollection();
        this.medias = new ArtistGallery.Collections.MediasCollection();
        this.orientations= new ArtistGallery.Collections.OrientationsCollection();
        this.subjects = new ArtistGallery.Collections.SubjectsCollection();
    },

    editArtItem: function () {

        this.model.set({
            'name':               this.$('#add-art-item-name').val(),
            'description':        this.$('#add-art-item-description').val(),
            'price':              this.$('#add-art-item-price').val(),
            'keywords':           this.$('#add-art-item-keywords').val(),
            'style_id':           this.$("#add-art-item-style :selected").val(),
            'media_id':           this.$("#add-art-item-medium :selected").val(),
            'orientation_id':     this.$("#add-art-item-orientation :selected").val(),
            'subject_id':         this.$("#add-art-item-subject :selected").val(),
            'category_id':        this.$("#select-category :selected").val(),
            'vertical_size':      this.$('#add-art-item-vsize').val(),
            'horizontal_size':    this.$('#add-art-item-hsize').val(),
        });
        this.model.save().then(function(){
            alert('Done');
            console.log('Edit success!');
        });
        return
    },

    render: function () {
        //console.log(this.model.toJSON());
        this.$el.html(this.template(this.model.toJSON()));
        this.fillAllSelects();
        return this;
    },

    fillAllSelects: function () {
        this.fillCategories();
        this.fillStyles();
        this.fillMedias();
        this.fillOrientations();
        this.fillSubjects();
    },

    fillCategories: function () {
        var model = this.model;
        this.categories.fetch({
            success: function (collection, response) {
                collection.each(function(category){
                    //console.log(category);
                    var category_id, category_name;
                    category_name = category.toJSON().name;
                    category_id = category.toJSON().id;
                    if (category_id == model.toJSON().category_id){
                        this.$("#select-category").append("<option value=" + category_id + " selected=\"selected\">" + category_name + "</option>");
                    } else {
                        this.$("#select-category").append("<option value=" + category_id + ">" + category_name + "</option>");
                    }
                    return
                });
            }
        });
    },

    fillStyles: function () {
        var model = this.model;
        this.styles.fetch({
            success: function (collection, response) {
                collection.each(function(style){
                    //console.log(style);
                    var style_id, style_name;
                    style_name = style.toJSON().name;
                    style_id = style.toJSON().id;
                    if (style_id == model.toJSON().style_id){
                        this.$("#add-art-item-style").append("<option value=" + style_id + " selected=\"selected\">" + style_name + "</option>");
                    } else {
                        this.$("#add-art-item-style").append("<option value=" + style_id + ">" + style_name + "</option>");
                    }
                    return
                });
            }
        });
    },

    fillMedias: function () {
        var model = this.model;
        this.medias.fetch({
            success: function (collection, response) {
                collection.each(function(media){
                    //console.log(media);
                    var media_id, media_name;
                    media_name = media.toJSON().name;
                    media_id = media.toJSON().id;
                    if (media_id == model.toJSON().media_id){
                        this.$("#add-art-item-medium").append("<option value=" + media_id + " selected=\"selected\">" + media_name + "</option>");
                    } else {
                        this.$("#add-art-item-medium").append("<option value=" + media_id + ">" + media_name + "</option>");
                    }
                    return
                });
            }
        });
    },

    fillOrientations: function () {
        var model = this.model;
        this.orientations.fetch({
            success: function (collection, response) {
                collection.each(function(orientation){
                    //console.log(orientation);
                    var orientation_id, orientation_name;
                    orientation_name = orientation.toJSON().name;
                    orientation_id = orientation.toJSON().id;
                    if (orientation_id == model.toJSON().orientation_id){
                        this.$("#add-art-item-orientation").append("<option value=" + orientation_id + " selected=\"selected\">" + orientation_name + "</option>");
                    } else {
                        this.$("#add-art-item-orientation").append("<option value=" + orientation_id + ">" + orientation_name + "</option>");
                    }
                    return
                });
            }
        });
    },

    fillSubjects: function () {
        var model = this.model;
        this.subjects.fetch({
            success: function (collection, response) {
                collection.each(function(subject){
                    //console.log(subject);
                    var subject_id, subject_name;
                    subject_name = subject.toJSON().name;
                    subject_id = subject.toJSON().id;
                    if (subject_id == model.toJSON().subject_id){
                        this.$("#add-art-item-subject").append("<option value=" + subject_id + " selected=\"selected\">" + subject_name + "</option>");
                    } else {
                        this.$("#add-art-item-subject").append("<option value=" + subject_id + ">" + subject_name + "</option>");
                    }
                    return
                });
            }
        });
    },

});
