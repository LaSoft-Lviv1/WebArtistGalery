    var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

    ArtistGallery.Views.PasswordRecoveryEdit = (function(superClass) {
        extend(PasswordRecoveryEdit, superClass);

      function PasswordRecoveryEdit() {
        this.render = bind(this.render, this);
      return PasswordRecoveryEdit.__super__.constructor.apply(this, arguments);
    }

    PasswordRecoveryEdit.prototype.template = JST["backbone/templates/password_recovery/passwordRecoveryEdit"];

    PasswordRecoveryEdit.prototype.events = {
      "click button.edit-password": "editPassword"
    };

    PasswordRecoveryEdit.prototype.initialize = function(options) {
        this.passwordRecoveryModel = options.passwordRecoveryModel;
        return this.listenTo(this.model, "error", this.renderError);
    };

    PasswordRecoveryEdit.prototype.renderError = function() {};

    PasswordRecoveryEdit.prototype.editPassword = function(e) {
    e.preventDefault();

        this.passwordRecoveryModel.set({
            password:               this.$('#password').val(),
            password_confirmation:  this.$('#password_confirmation').val()
        });

        console.log(this.passwordRecoveryModel.toJSON());
        this.passwordRecoveryModel.save({}, {
            success: function (response) {
                alert('Password has been changed. Try to sign in.');
                window.location.href = '/#';
                window.location.reload();
            },
            error: function (model, xhr, options) {
                if (xhr.responseJSON.message.password){
                    alert('Password ' + xhr.responseJSON.message.password);
                };
                if(xhr.responseJSON.message.reset_password_token){
                    alert('Reset password token ' + xhr.responseJSON.message.reset_password_token);
                };
                //console.log(xhr.responseJSON.message);
            }
        });
    return
    };

    PasswordRecoveryEdit.prototype.render = function() {
      this.$el.html(this.template());
    return this;
    };

    return PasswordRecoveryEdit;

    })(Backbone.View);
