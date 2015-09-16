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

    Login.prototype.login = function(e) {
        e.preventDefault();
        this.model.set({
            email: this.$('#email').val(),
            password: this.$('#password').val(),
            remember_me: "0"
        });

        this.model.save({}, {
            success: function (response) {
                console.log(response.get('authentication_token'));
                console.log(response.toJSON());
                localStorage.setItem('user_token', response.get('authentication_token'));
                localStorage.setItem('name', response.get('name'));
                localStorage.setItem('role', response.get('role'));
            },
            error: function (response) {
                console.log(response.toJSON());
            }
        });
        this.model.set({
            id: "1"
        });

        //alert('login');
        $('#modal').modal('hide');
        //Backbone.history.loadUrl(Backbone.history.fragment);
        //window.location.href = '/#';
        window.location.reload();
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
