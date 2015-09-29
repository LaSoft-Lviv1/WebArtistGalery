var bind = function (fn, me){
    return function(){ return fn.apply(me, arguments); };
},
    extend = function(child, parent) {
        for (var key in parent) {
            if (hasProp.call(parent, key)) child[key] = parent[key];
        }
        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    },
    hasProp = {}.hasOwnProperty;

ArtistGallery.Views.SignupArtist = (function(superClass) {
    
    extend(SignupArtist, superClass);

    function SignupArtist() {
        this.render = bind(this.render, this);
        return SignupArtist.__super__.constructor.apply(this, arguments);
    }

    SignupArtist.prototype.template = JST["backbone/templates/registration/signup_artist"];

    SignupArtist.prototype.events = {
      "click button.reg"    : "signup",
      "click a.back"        : "goBack",
      "focusout input#first_name"   : "checkName",
      "focusout input#second_name"  : "checkSurname",
      "focusout input#email"        : "checkEmail",
      "focusout input#password"     : "checkPassword",
      "focusout input#password_confirmation":"confirmPassword"      

    };

    SignupArtist.prototype.initialize = function() {
        return this.modal = new ArtistGallery.Models.Registration();
    };

    SignupArtist.prototype.renderError = function() {};
    

    SignupArtist.prototype.signup = function(e) {
        e.preventDefault();
        if(/*validateForm()*/true) {
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
                    //console.log(response.get('authentication_token'));
                    //console.log(response.toJSON());
                    localStorage.setItem('user_token', response.get('user_token'));
                    localStorage.setItem('name', response.get('name'));
                    localStorage.setItem('role', response.get('role'));
                    alert('Confirmation letter has been sent to your email.');
                    window.location.reload();
                },
                error: function (response) {
                    console.log(response.toJSON());
                }
            });
        }
        return
    };

    validateForm = function() {
        var name = $('#first_name').val(),
            surname = $('#second_name').val(),
            email = $('#email').val(),
            password = $("#password").val(),
            confirm = $("#password_confirmation").val(),
            regexText = /^([A-Z\u0410-\u042F\u0406\u0407][A-Za-z\u0410-\u044F\u0456\u0457 ,.'`-]{3,30})$/gm,
            regexEmailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            regexPasswordValid = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,})\S$/;
            
            $('.form-group').focus(function () {
                console.log("focus");
            })

            // switch() {
            //     case (!regexText.test(name)):
            //         alert("wrong name");
            //     case (!regexText.test(surname)):
            //         alert("wrong surname");
            //     case (!regexEmailValid.test(email)):
            //         alert("wrong password");
            //     case (!regexPasswordValid.test(password)):
            //         alert("wrong password");
            //     case (password !== confirm):
            //         alert("passwords should be the same");
            //         return false;
            //         break;
            //     case ((regexText.test(name))&&(regexText.test(surname))&&(egexEmailValid.test(email))&&(regexPasswordValid.test(password))&&(password === confirm)):
            //         return true;
            // }
        // if((regexText.test(name))&&(regexText.test(surname))&&(egexEmailValid.test(email))&&(regexPasswordValid.test(password))&&(password === confirm)){
        //     return true;
        // }else if(!regexText.test(name)){
        //     alert("wrong name");
        // } else if(!regexText.test(surname)){
        //     alert("wrong surname");
        // } else if (!regexEmailValid.test(email)) {
        //     alert("wrong email");
        // }else if (!regexPasswordValid.test(password)) {
        //     alert("wrong password");
        // }else if (password !== confirm) {
        //     alert("passwords should be the same");
        // } else {return false;}
        // return false;
    };
    
    SignupArtist.prototype.checkName = function () {
        console.log('focusout Name');

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
