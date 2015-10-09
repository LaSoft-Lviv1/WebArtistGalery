var EditArtItemView;
EditArtItemView = Backbone.View.extend({
    template: JST['backbone/templates/art_item/edit'],

    events: {
        'click #submit': 'createNewArtItem',
        'change #add-art-photo-btn': 'show_image'
    },

    initialize: function () {
        this.categories = new ArtistGallery.Collections.CategoriesCollection();
        this.styles = new ArtistGallery.Collections.StylesCollection();
        this.medias = new ArtistGallery.Collections.MediasCollection();
        this.orientations= new ArtistGallery.Collections.OrientationsCollection();
        this.subjects = new ArtistGallery.Collections.SubjectsCollection();
    },

    createNewArtItem: function () {
        var formData = new FormData(),
            $input = $('#add-art-photo-btn');

        formData.append('art_item[name]',               this.$('#add-art-item-name').val());
        formData.append('art_item[description]',        this.$('#add-art-item-description').val());
        formData.append('art_item[price]',              this.$('#add-art-item-price').val());
        formData.append('art_item[keywords]',           this.$('#add-art-item-keywords').val());
        formData.append('art_item[style_id]',           this.$("#add-art-item-style :selected").val());
        formData.append('art_item[media_id]',           this.$("#add-art-item-medium :selected").val());
        formData.append('art_item[orientation_id]',     this.$("#add-art-item-orientation :selected").val());
        formData.append('art_item[subject_id]',         this.$("#add-art-item-subject :selected").val());
        formData.append('art_item[category_id]',        this.$("#select-category :selected").val());
        formData.append('art_item[vertical_size]',      this.$('#add-art-item-vsize').val());
        formData.append('art_item[horizontal_size]',    this.$('#add-art-item-hsize').val());
        formData.append('art_item[source_file]',        $input[0].files[0]);
        formData.append('user_token',                   localStorage.getItem('user_token'));

        $.ajax({
            url: this.model.url(),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST'
        });

        alert('You added a new Picture.');
        return
    },

    show_image: function(e) {
        var reader;
        reader = new FileReader();
        reader.onload = (function(_this) {
            return function(event) {
                var img;
                img = new Image();
                img.src = event.target.result;
                img.style.width = "100%";
                _this.$("div#image_preview img").remove();
                return _this.$("#image_preview").append(img);
            };
        })(this);
        reader.onerror = (function(_this) {
            return function(event) {
                return alert("Файл не может быть прочитан! код " + event.target.error.code);
            };
        })(this);
        return reader.readAsDataURL(e.target.files[0]);
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
