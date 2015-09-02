var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

ArtistGallery.Views.Login = (function(superClass) {
    extend(Login, superClass);

    function Login() {
        this.render = bind(this.render, this);
        return Login.__super__.constructor.apply(this, arguments);
    }

    Login.prototype.template = JST["backbone/templates/mylogin1"];

    Login.prototype.events = {
        "click button.login": "login",
        "click button.signup": "signup"
    };

    Login.prototype.initialize = function() {
        this.listenTo(this.model, "error", this.renderError);
        return this.listenTo(this.model, "sync", this.triggerLoggenIn);
    };

    Login.prototype.triggerLoggenIn = function() {
        alert('SuccessOk');
        //alert(data.toJSON);
        return
    };

    Login.prototype.renderError = function() {
        //alert(data.toJSON);
        alert('Error');
        return
    };

    Login.prototype.login = function(e) {
        e.preventDefault();
        this.model.set({
            email: this.$('#email').val(),
            password: this.$('#password').val(),
            remember_me: "0"
        });
        //ArtistGallery.loginmodel.set({
        //    email: this.$('#email').val()
        //});
        //ArtistGallery.loginmodel.set({
        //    password: this.$('#password').val()
        //});
        //ArtistGallery.loginmodel.set({
        //    remember_me: "0"
        //});
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
        this.model.set({
            id: "1"
        });
        //this.model = ArtistGallery.loginmodel;
        //console.log(this.model);
        alert('login');
        $('#modal').modal('hide');
        window.location.href = '/#';
        //this.model.save({
        //    success: function (response) {
        //        alert('succ');
        //        //localStorage.setItem('auth_token', 'red');
        //        //localStorage.setItem('email', 'Helvetica');
        //    },
        //    error: function (response) {
        //        alert('err');
        //        //$(that.el).html(that.template(response.toJSON()));
        //    }
        //});
        return
    };

    Login.prototype.signup = function(e) {
        e.preventDefault();
        this.signupView = new SignupView();
        return $(".modal-content").html(this.signupView.render().el);
    };

    Login.prototype.logout = function(e) {
        e.preventDefault();
        debugger;
        ArtistGallery.loginmodel.destroy();
        alert('destroy not method');
        return
    };

    Login.prototype.render = function() {
        this.$el.html(this.template());
        return this;
    };

    return Login;

})(Backbone.View);
