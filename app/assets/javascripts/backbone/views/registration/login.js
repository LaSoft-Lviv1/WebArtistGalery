var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ArtistGallery.Views.Login = (function(superClass) {
    extend(Login, superClass);

    function Login() {
        this.render = bind(this.render, this);
        return Login.__super__.constructor.apply(this, arguments);
    }

    Login.prototype.template = JST["backbone/templates/registration/login"];

    Login.prototype.events = {
        "click button.login": "login",
        "click button.signup": "signup",
        'click #forgot-pass': 'forgotPass',
        'focusin input' : 'inputInFocus'
    };

    Login.prototype.initialize = function() {
        this.listenTo(this.model, "error", this.renderError);
        return this.listenTo(this.model, "sync", this.triggerLoggenIn);
    };

    Login.prototype.triggerLoggenIn = function() {
        //alert('SuccessOk');
        return
    };

    Login.prototype.renderError = function() {
        //alert('Error');
        return
    };

    var validateLogin = function() {
        var regExEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            regExPassword = /^.{8,}$/, //1 digit, 1 small char, 1 big char, 8 char min
            email = $('#email').val(),
            password = $('#password').val();
            if(!regExEmail.test(email)) {
                this.$("#emailValidationErr").css("display", "inline-block");
                return false;
            } else if(!regExPassword.test(password)) {
                this.$("#passwordValidationErr").css("display", "inline-block");
                return false;   
            } else {
                return true;
            }
    };

    Login.prototype.login = function(e) {
        e.preventDefault();
        if(validateLogin()) {
            this.model.set({
                email: this.$('#email').val(),
                password: this.$('#password').val(),
                remember_me: "0"
            });

            this.model.save({}, {
                success: function (response) {
                    localStorage.setItem('user_token', response.get('user_token'));
                    localStorage.setItem('name', response.get('name'));
                    localStorage.setItem('role', response.get('role'));
                    $('#modal').modal('hide');
                    window.location.reload();
                },
                error: function (model, xhr, options) {
                    var xhrMessage;
                    xhrMessage = xhr.responseJSON.message;
                    // check response
                    if (xhrMessage === 'wrongMail') {
                        this.$("#emailValidationErr").css("display", "inline-block");
                    } else if (xhrMessage === 'wrongPassword') {
                        this.$("#passwordValidationErr").css("display", "inline-block");
                    } else {
                          console.log(xhrMessage);
                    }
                }
            });

            //this.model.save().done(function(response){
            //  localStorage.setItem('user_token', response.user_token);
            //  localStorage.setItem('name', response.name);
            //  localStorage.setItem('role', response.role);
            //  $('#modal').modal('hide');
            //  window.location.reload();
            //}).fail(function(response){
            //  console.log('error resp: ' + response.message);
            //});
        }
        return
    };
    Login.prototype.inputInFocus = function (e) {
    var selector = '#' + e.target.id + 'ValidationErr';
    $(selector).css("display", "none");
};

    Login.prototype.signup = function(e) {
        e.preventDefault();
        this.signupView = new SignupView();
        return $(".modal-content").html(this.signupView.render().el);
    };

    Login.prototype.forgotPass = function(e) {
        e.preventDefault();
        $('#modal').modal('hide');
        window.location.href = '/#users/password';
        return
    };
    Login.prototype.render = function() {
        this.$el.html(this.template());
        return this;
    };

    return Login;

})(Backbone.View);
