    var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

    ArtistGallery.Views.SignupCustomer = (function(superClass) {
    extend(SignupCustomer, superClass);

      function SignupCustomer() {
        this.render = bind(this.render, this);
      return SignupCustomer.__super__.constructor.apply(this, arguments);
    }

    SignupCustomer.prototype.template = JST["backbone/templates/registration/signup_customer"];

    SignupCustomer.prototype.events = {
      "click button.reg": "signup",
      'click a.back': 'goBack'
    };

    SignupCustomer.prototype.initialize = function() {
    return this.listenTo(this.model, "error", this.renderError);
    };

    SignupCustomer.prototype.renderError = function() {};

    SignupCustomer.prototype.signup = function(e) {
    e.preventDefault();

    this.model.set({
        name: this.$('#name').val(),
        email: this.$('#email').val(),
        password: this.$('#password').val(),
        password_confirmation: this.$('#password_confirmation').val(),
        role: 'customer'
    });

    console.log(this.model.toJSON());
    this.model.save({}, {
            success: function (response) {
                //console.log(response.get('authentication_token'));
                //console.log(response);
                localStorage.setItem('user_token', response.get('user_token'));
                localStorage.setItem('name', response.get('name'));
                localStorage.setItem('role', response.get('role'));
                window.location.reload();
            },
            error: function (response) {
                console.log(response.toJSON());
            }
        }
    );
    return
    };

    SignupCustomer.prototype.render = function() {
      this.$el.html(this.template());
    return this;
    };
    
    SignupCustomer.prototype.goBack = function(e) {
        e.preventDefault();
        this.signupView = new SignupView();
        return $(".modal-content").html(this.signupView.render().el);
    };

    return SignupCustomer;

    })(Backbone.View);
