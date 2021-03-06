var AddArtItemView;
AddArtItemView = Backbone.View.extend({
    template: JST['backbone/templates/art_item/new'],

    events: {
        'click #submit': 'createNewArtItem',
        'change #add-art-photo-btn': 'show_image',
        'focusout .form-control' : 'focusOut',
        'focusin .form-control' : 'focusIn'

        },

    initialize: function () {
        this.categories = new ArtistGallery.Collections.CategoriesCollection();
        this.styles = new ArtistGallery.Collections.StylesCollection();
        this.medias = new ArtistGallery.Collections.MediasCollection();
        this.orientations= new ArtistGallery.Collections.OrientationsCollection();
        this.subjects = new ArtistGallery.Collections.SubjectsCollection();
        this.model = new ArtistGallery.Models.ArtItem();
    },
    validate: function(selector, data) {



    },
    focusIn: function(e) {
        this.$(e.target).parent().removeClass('has-error');
    },

    focusOut: function (e) {
        var data, selector, messageError;
        
        selector = e.target.id;
        data = this.$('#' + selector).val();
        if(data === '' || data === null){
            this.$('#error').addClass('alert alert-danger').empty().append('Error: please fill all attr and sellect categories');
                this.$(e.target).parent().addClass('has-error');
        }
        console.log(data);
    },
    createNewArtItem: function () {
        
        var formData = new FormData();
            $input = $('#add-art-photo-btn');

        //validate

        function validate() {
            var data = ['add-art-item-name',
                'add-art-item-description',
                'add-art-item-price',
                'add-art-item-keywords',
                'add-art-item-style',
                'add-art-item-medium',
                'add-art-item-orientation',
                'add-art-item-subject',
                'select-category',    
             
                'add-art-item-vsize',
                'add-art-item-hsize'],
                valid;

            for (var i = 0; i < data.length; i++ ) {
                var field = this.$('#' + data[i]).val();
                //console.log(this.$('#' + data[i]));

                if (field === '' || field === null){
                    this.$('#error').addClass('alert alert-danger').empty().append('Error: please fill all attr and sellect categories');
                    //console.log(field);
                    this.$('#' + data[i]).parent().addClass('has-error');
                    valid = false;
                } 

            }
            if (!valid){
                return false;
            } else {
            this.$('#error').addClass('alert alert-danger').empty(); 
                return true;
            }

            
        }
    //if (validate()) {

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
    //}
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
        //alert('new tem render');
        this.$el.html(this.template());
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
        this.categories.fetch({
            success: function (collection, response) {
                collection.each(function(category){
                    //console.log(category);
                    var category_id, category_name;
                    category_name = category.toJSON().name;
                    category_id = category.toJSON().id;
                    return this.$("#select-category").append("<option value=" + category_id + ">" + category_name + "</option>");
                });
            }
        });
    },

    fillStyles: function () {
        this.styles.fetch({
            success: function (collection, response) {
                collection.each(function(style){
                    //console.log(style);
                    var style_id, style_name;
                    style_name = style.toJSON().name;
                    style_id = style.toJSON().id;
                    return this.$("#add-art-item-style").append("<option value=" + style_id + ">" + style_name + "</option>");
                });
            }
        });
    },

    fillMedias: function () {
        this.medias.fetch({
            success: function (collection, response) {
                collection.each(function(media){
                    //console.log(media);
                    var media_id, media_name;
                    media_name = media.toJSON().name;
                    media_id = media.toJSON().id;
                    return this.$("#add-art-item-medium").append("<option value=" + media_id + ">" + media_name + "</option>");
                });
            }
        });
    },

    fillOrientations: function () {
        this.orientations.fetch({
            success: function (collection, response) {
                collection.each(function(orientation){
                    //console.log(orientation);
                    var orientation_id, orientation_name;
                    orientation_name = orientation.toJSON().name;
                    orientation_id = orientation.toJSON().id;
                    return this.$("#add-art-item-orientation").append("<option value=" + orientation_id + ">" + orientation_name + "</option>");
                });
            }
        });
    },

    fillSubjects: function () {
        this.subjects.fetch({
            success: function (collection, response) {
                collection.each(function(subject){
                    //console.log(subject);
                    var subject_id, subject_name;
                    subject_name = subject.toJSON().name;
                    subject_id = subject.toJSON().id;
                    return this.$("#add-art-item-subject").append("<option value=" + subject_id + ">" + subject_name + "</option>");
                });
            }
        });
    },

});
