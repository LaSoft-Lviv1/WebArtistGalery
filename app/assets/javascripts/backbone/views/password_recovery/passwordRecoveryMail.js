    var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

    ArtistGallery.Views.PasswordRecoveryMail = (function(superClass) {
        extend(PasswordRecoveryMail, superClass);

      function PasswordRecoveryMail() {
        this.render = bind(this.render, this);
      return PasswordRecoveryMail.__super__.constructor.apply(this, arguments);
    }

    PasswordRecoveryMail.prototype.template = JST["backbone/templates/password_recovery/passwordRecoveryMail"];

    PasswordRecoveryMail.prototype.events = {
      "click button.send-mail": "sendMail"
    };

    PasswordRecoveryMail.prototype.initialize = function() {
        this.recoveryPass = new ArtistGallery.Models.RecoveryPassword();
        return this.listenTo(this.model, "error", this.renderError);
    };

    PasswordRecoveryMail.prototype.renderError = function() {};

    PasswordRecoveryMail.prototype.sendMail = function(e) {
    e.preventDefault();

        this.recoveryPass.set({
        email: this.$('#email').val()
    });

    console.log(this.model.toJSON());
        this.recoveryPass.save({}, {
            success: function (response) {
                alert('Recovery instruction has been sent to your email.');
                window.location.href = '/#';
            },
            error: function (model, xhr, options) {
                alert(xhr.responseJSON.message);
            }
        }
    );
    return
    };

    PasswordRecoveryMail.prototype.render = function() {
      this.$el.html(this.template());
    return this;
    };

    return PasswordRecoveryMail;

    })(Backbone.View);
