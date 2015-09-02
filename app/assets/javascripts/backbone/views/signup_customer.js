    var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

    ArtistGallery.Views.SignupCustomer = (function(superClass) {
    extend(SignupCustomer, superClass);

      function SignupCustomer() {
        this.render = bind(this.render, this);
      return SignupCustomer.__super__.constructor.apply(this, arguments);
    }

    SignupCustomer.prototype.template = JST["backbone/templates/signup_customer"];

    SignupCustomer.prototype.events = {
      "click button.reg": "signup"
    };

    SignupCustomer.prototype.initialize = function() {
    return this.listenTo(this.model, "error", this.renderError);
    };

    SignupCustomer.prototype.renderError = function() {};

    SignupCustomer.prototype.signup = function(e) {
    e.preventDefault();

    this.model.set({
      email: this.$('#email').val()
    });
    this.model.set({
      password: this.$('#password').val()
    });
    this.model.set({
      password_confirmation: this.$('#password_confirmation').val()
    });
    this.model.set({
       role: 'customer'
    });
    console.log(this.model.toJSON());
    return this.model.save(
        {}, {
            success: function (response) {
                console.log(response.get('authentication_token'));
                console.log(response);
                localStorage.setItem('user_token', response.get('authentication_token'));
                localStorage.setItem('email', response.get('email'));
                localStorage.setItem('role', response.get('role'));
            },
            error: function (response) {
                console.log(response.toJSON());
            }
        }
    );
    };

    SignupCustomer.prototype.render = function() {
      this.$el.html(this.template());
    return this;
    };

    return SignupCustomer;

    })(Backbone.View);
