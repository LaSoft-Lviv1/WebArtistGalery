var bind = function(fn, me) { 
    return function(){ 
        return fn.apply(me, arguments);
    }; 
},
extend = function(child, parent) { 
    for (var key in parent) { 
        if (hasProp.call(parent, key)) child[key] = parent[key];
    } function ctor() { 
        this.constructor = child; 
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
},
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
        'click a.back': 'goBack',
        "focusin input" : "inputInFocus",
        "focusout input" : "checkForm"  
    };

    SignupCustomer.prototype.initialize = function() {
       return this.modal = new ArtistGallery.Models.Registration();
   };

   SignupCustomer.prototype.renderError = function() {};

   SignupCustomer.prototype.signup = function(e) {

    e.preventDefault();
    if(validateForm('signup')) {
        console.log(validateForm('signup'));
        this.model.set({
            name: this.$('#name').val(),
            email: this.$('#email').val(),
            password: this.$('#password').val(),
            password_confirmation: this.$('#password_confirmation').val(),
            role: 'customer'
        });

        this.model.save({}, {
            success: function (response) {
                localStorage.setItem('user_token', response.get('user_token'));
                localStorage.setItem('name', response.get('name'));
                localStorage.setItem('role', response.get('role'));
                localStorage.setItem('id', response.get('id'));
                alert('Confirmation letter has been sent to your email.');
                window.location.reload();
            },
            error: function (model, xhr, options) {
                console.log(xhr.responseJSON.message);
            }
        });
    }
    return
};

var validateForm = function(dataValidate, data) {
    var confirm = $("#password_confirmation").val(),
    regexText = /^([A-Z][a-z ,.'`-]{2,30})$/,
    regexEmailValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    regexPasswordValid = /^.{8,}$/,
    inputs,
    a;

    if(dataValidate === 'signup') {
        inputs = [{
            dataValidate: 'name',
            data: this.$('#name').val()
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

    function chooseValid (dataValidate, data) {
        switch(dataValidate) {
            case 'name':
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

SignupCustomer.prototype.checkForm = function (e) {
    var data, selector;
    selector = e.target.id;
    data = this.$('#' + selector).val();
    if(data){
        if(e.target.id === 'password_confirmation') data = [data, this.$('#password').val()];
        if (!validateForm(e.target.id, data)) {
            this.$('#' + selector +'ValidationErr').css("display", "inline-block");
        }
    }
};

SignupCustomer.prototype.inputInFocus = function (e) {
    var selector = '#' + e.target.id + 'ValidationErr';
    $(selector).css("display", "none");
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
