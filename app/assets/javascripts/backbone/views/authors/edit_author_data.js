var EditAuthorDataView;
EditAuthorDataView = Backbone.View.extend({
    template: JST['backbone/templates/authors/edit_author_data'],

    events: {
        'click #submit': 'editData',
        'change #add-photo-btn': 'show_image'
    },

    initialize: function () {
        this.cities = new ArtistGallery.Collections.CitiesCollection();
    },

    editData: function () {
        var formData = new FormData(),
            $input = $('#add-photo-btn');

        formData.append('author[first_name]',       this.$('#add-author-first-name').val());
        formData.append('author[second_name]',      this.$('#add-author-second-name').val());
        formData.append('author[info_about]',       this.$('#add-author-info-about').val());
        formData.append('author[phone_number]',     this.$('#add-author-phone-number').val());
        formData.append('author[city_id]',          this.$("#select-city :selected").val());
        if (this.photoChanged) {
            formData.append('author[photo]',        $input[0].files[0]);
        }
        formData.append('user_token',               localStorage.getItem('user_token'));
        $.ajax({
            url: this.model.url(),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'PUT'
        });
        //console.log(formData);
        alert('You\'ve changed your own info.');
        return
    },

    show_image: function(e) {
        var reader;
        var photoChanged = true;
        reader = new FileReader();
        reader.onload = (function(_this) {
            return function(event) {
                var img;
                img = new Image();
                img.src = event.target.result;
                img.style.width = "100%";
                _this.$("div#image_preview img").remove();
                _this.$("#image_preview").append(img);
                photoChanged = true;
                return
            };
        })(this);
        reader.onerror = (function(_this) {
            return function(event) {
                return alert("Файл не может быть прочитан! код " + event.target.error.code);
            };
        })(this);
        reader.readAsDataURL(e.target.files[0]);
        this.photoChanged = photoChanged;
        return
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.fillCities();
        this.showAuthorPhoto();
        return this;
    },

    showAuthorPhoto: function () {
        if (this.model.toJSON().photo.url != null) {
            var img;
            img = new Image();
            img.src = this.model.toJSON().photo.url;
            img.style.width = "100%";
            this.$("div#image_preview img").remove();
            return this.$("#image_preview").append(img);
        }
    },

    fillCities: function () {
        var model = this.model;
        this.cities.fetch({
            success: function (collection, response) {
                collection.each(function(city){
                    //console.log(category);
                    var city_id, city_name;
                    city_name = city.toJSON().name;
                    city_id = city.toJSON().id;
                    if (city_id == model.toJSON().city_id){
                        this.$("#select-city").append("<option value=" + city_id + " selected=\"selected\">" + city_name + "</option>");
                    } else {
                        this.$("#select-city").append("<option value=" + city_id + ">" + city_name + "</option>");
                    }
                    return
                });
            }
        });
    },
});
