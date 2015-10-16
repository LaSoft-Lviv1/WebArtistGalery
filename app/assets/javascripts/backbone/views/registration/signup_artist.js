var bind = function (fn, me){
    return function(){ 
        return fn.apply(me, arguments); 
    };
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
        "focusin input" : "inputInFocus",
        "focusout input" : "checkForm"     

    };

SignupArtist.prototype.initialize = function() {
    return this.modal = new ArtistGallery.Models.Registration();
};

SignupArtist.prototype.renderError = function() {};


SignupArtist.prototype.signup = function(e) {
    e.preventDefault();
    if(validateForm('signup')) {
        this.model.set({
            first_name: this.$('#first_name').val(),
            second_name: this.$('#second_name').val(),
            email: this.$('#email').val(),
            password: this.$('#password').val(),
            password_confirmation: this.$('#password_confirmation').val(),
            role: 'artist'
        });

            this.model.save({}, {
                success: function (response) {
                    localStorage.setItem('user_token', response.get('user_token'));
                    localStorage.setItem('name', response.get('name'));
                    localStorage.setItem('role', response.get('role'));
                    localStorage.setItem('id', response.get('id'));
                    alert('Confirmation letter has been sent to your email.');
                    $('#modal').modal('hide');
                    window.location.href = "/#authors/" +response.get('id') +"/edit";
                },
                error: function (response) {
                    console.log(response.toJSON());
                }
            });
            window.location.reload();
        }
        return
    };

    var validateForm = function(dataValidate, data) {
        var regexText = /^([A-Z][a-z ,.'`-]{2,30})$/,
            regexEmailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            regexPasswordValid = /^.{8,}$/,
            inputs,
            a = true;

        if(dataValidate === 'signup') {
            inputs = [{
                dataValidate: 'first_name',
                data: this.$('#first_name').val()
            },
            {
                dataValidate: 'second_name',
                data: this.$('#second_name').val()
            },
            {
                dataValidate: 'email',
                data: this.$('#email').val()
            },
            {
                dataValidate: 'password',
                data: this.$('#password').val()
            },
            {
                dataValidate: 'password_confirmation',
                data: [this.$('#password_confirmation').val(), 
                this.$('#password').val()]
            }];

            for (var i = 0; i < inputs.length; i++) {
                if (!chooseValid(inputs[i].dataValidate, inputs[i].data)) {
                    this.$('#' + inputs[i].dataValidate +'ValidationErr').css("display", "inline-block");
                    return false;
                }
            };
        };
            

        function chooseValid (choose, data) {
            switch(choose) {
                case 'first_name':
                    regexText.test(data) ? a = 1 : a = 0;
                break;
                case 'second_name':
                    regexText.test(data) ? a = 1 : a = 0;
                break;
                case 'email':
                    regexEmailValid.test(data) ? a = 1 : a = 0;
                break;
                case 'password':
                    regexPasswordValid.test(data) ? a = 1 : a = 0;
                break;
                case 'password_confirmation':
                    data[0] === data[1] ? a = 1 : a = 0;
                break;
                default: 
                     console.log('some dataValidate');
                break;
            }
            return a;
        }

        chooseValid(dataValidate, data);
        return a;
    };
    
    SignupArtist.prototype.checkForm = function (e) {
        var data, selector;
        selector = e.target.id;
        data = this.$('#' + selector).val();
        if(data){
            console.log(e.target.id + ' ' + data);
            if(e.target.id === 'password_confirmation') data = [data, this.$('#password').val()];
            if (!validateForm(e.target.id, data)) {
                this.$('#' + selector +'ValidationErr').css("display", "inline-block");
            }
        }
    };

    SignupArtist.prototype.inputInFocus = function (e) {
        var selector = '#' + e.target.id + 'ValidationErr';
        $(selector).css("display", "none");
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
