(function($) {
    Backbone._sync = Backbone.sync;
    Backbone.sync = function(method, model, options) {
        if (!options.noCSRF) {
            var beforeSend = options.beforeSend;

            // Set X-CSRF-Token HTTP header
            options.beforeSend = function(xhr) {
                var token = $('meta[name="csrf-token"]').attr('content');
                if (token) xhr.setRequestHeader('X-CSRF-Token', token);
                if (beforeSend) return beforeSend.apply(this, arguments);
            };
        }

        // Serialize data, optionally using paramRoot
        //alert(method);
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch' || method === 'delete')) {
            options.contentType = 'application/json';
            data = JSON.stringify(options.attrs || model.toJSON(options));
            if (model.paramRoot) {
                data = {};
                data[model.paramRoot] = model.toJSON(options);
            } else {
                data = model.toJSON();
            }
            data.user_token = localStorage.getItem('user_token');
            //console.log(data);
            options.data = JSON.stringify(data);
        }

        return Backbone._sync(method, model, options);
    };

})(jQuery);
