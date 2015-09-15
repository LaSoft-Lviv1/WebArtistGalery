    var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

    ArtistGallery.Views.SignupArtist = (function(superClass) {
    extend(SignupArtist, superClass);

      function SignupArtist() {
        this.render = bind(this.render, this);
      return SignupArtist.__super__.constructor.apply(this, arguments);
    }

    SignupArtist.prototype.template = JST["backbone/templates/registration/signup_artist"];

    SignupArtist.prototype.events = {
      "click button.reg": "signup",
      "click a.back": "goBack"
    };

    SignupArtist.prototype.initialize = function() {
    return this.modal = new ArtistGallery.Models.Registration();
    };

    SignupArtist.prototype.renderError = function() {};

    SignupArtist.prototype.signup = function(e) {
    e.preventDefault();
    this.model.set({
        first_name: this.$('#first_name').val(),
        second_name: this.$('#second_name').val(),
        email: this.$('#email').val(),
        password: this.$('#password').val(),
        password_confirmation: this.$('#password_confirmation').val(),
        role: 'artist'
    });

    //console.log(this.model.toJSON());
    this.model.save({}, {
        success: function (response) {
            console.log(response.get('authentication_token'));
            console.log(response.toJSON());
            localStorage.setItem('user_token', response.get('authentication_token'));
            localStorage.setItem('email', response.get('email'));
            localStorage.setItem('role', response.get('role'));
        },
        error: function (response) {
            console.log(response.toJSON());
        }
    });
    window.location.reload();
    return
    };

    SignupArtist.prototype.render = function() {
      this.$el.html(this.template());
    return this;
    };

    SignupArtist.prototype.goBack = function(e) {
        e.preventDefault();
        this.signupView = new SignupView();
        return $(".modal-content").html(this.signupView.render().el);
    };

    return SignupArtist;

    })(Backbone.View);
