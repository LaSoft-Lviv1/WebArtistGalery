var base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

(base = ArtistGallery.Views).Authors || (base.Authors = {});

ArtistGallery.Views.Authors.AuthorView = (function(superClass) {
    extend(AuthorView, superClass);

    function AuthorView() {
        this.render = bind(this.render, this);
        return AuthorView.__super__.constructor.apply(this, arguments);
    }

    AuthorView.prototype.template = JST["backbone/templates/authors/author"];

    AuthorView.prototype.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-4 work_outer';

    AuthorView.prototype.events = {

    };

    AuthorView.prototype.render = function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    };

    return AuthorView;

})(Backbone.View);
