BASE_URL = "http://localhost:8080/_ah/api";
var globalUserIdCounter = 1;

var UserModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                options.url = BASE_URL + '/user/v1/create_user';
                options.success = user.successCallback;
                options.error = user.errorCallback;
                return Backbone.sync(method, model, options);
            case 'update':
                options.url = BASE_URL + '/user/v1/update_user';
                options.method = "POST";
                options.data = JSON.stringify({
                    'current_user_name': model.attributes.user_name,
                    // updating only 'display_name' as this is the only
                    // field from UI that can be updated
                    'display_name': model.attributes.display_name
                })
                return Backbone.sync(method, model, options);
            case 'delete':
                return Backbone.sync(method, model, options);
            case 'read':
                options.url = BASE_URL + '/user/v1/get_user';
                options.method = "POST";
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    },
    successCallback: function(data, textStatus, jqXHR) {
        // set user id
        // so that future .save() will call update
        user.set({ 'id': globalUserIdCounter });

        // increment the counter
        globalUserIdCounter++;

        // render game view
        appView.render();
    },
    errorCallback: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 409) {
            // set user id
            // so that future .save() will call 'update'
            user.set({ 'id': globalUserIdCounter });

            // increment the counter
            globalUserIdCounter++;

            // render app view
            appView.render();
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
            console.error(msg);

            // render login view
            loginView.render();
        }
    }
});

var user = new UserModel();
