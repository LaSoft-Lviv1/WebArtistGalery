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
        "click button.signup": "signup"
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

    validateLogin = function() {
        var regExEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            regExPassword = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/, //1 digit, 1 small char, 1 big char, 8 char min
            email = $('#email').val(),
            password = $('#password').val();
            console.log(!regExEmail.exec(email)); 
            if(!regExEmail.test(email)) {
                $('#email').focus();
                this.$("#emailValidationErr").css("display", "inline-block");
                this.$("#passValidationErr").css("display", "none");
                return false;
            //} else if(!regExPassword.test(password)) {
                $('#password').focus();
                this.$("#passValidationErr").css("display", "inline-block");
                this.$("#emailValidationErr").css("display", "none");
                return false;   
            } else {
                return true;
            }
    };

    Login.prototype.login = function(e) {
        e.preventDefault();
        console.log(this.$('#email').val());
        if(validateLogin()) {
            this.model.set({
                email: this.$('#email').val(),
                password: this.$('#password').val(),
                remember_me: "0"
            });

            this.model.save({}, {
                success: function (response) {
                    //debugger;
                    //console.log(response.get('authentication_token'));
                    //console.log(response);
                    localStorage.setItem('user_token', response.get('user_token'));
                    localStorage.setItem('name', response.get('name'));
                    localStorage.setItem('role', response.get('role'));
                    $('#modal').modal('hide');
                    window.location.reload();
                },
                error: function (model, xhr, options) {
                    console.log(xhr.responseJSON.message);
                }
            });

            //this.model.save().done(function(response){
            //  //debugger;
            //   console.log(response.authentication_token);
            //  //console.log(response);
            //  localStorage.setItem('user_token', response.user_token);
            //  localStorage.setItem('name', response.name);
            //  localStorage.setItem('role', response.role);
            //  $('#modal').modal('hide');
            //  window.location.reload();
            //}).fail(function(response){
            //  debugger;
            //  console.log('error resp: ' + response.message);
            //});
        }
        return
    };

    Login.prototype.signup = function(e) {
        e.preventDefault();
        this.signupView = new SignupView();
        return $(".modal-content").html(this.signupView.render().el);
    };

    Login.prototype.render = function() {
        this.$el.html(this.template());
        return this;
    };

    return Login;

})(Backbone.View);
