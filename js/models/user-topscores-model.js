var TopScoresModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                return Backbone.sync(method, model, options);
            case 'update':
                return Backbone.sync(method, model, options);
            case 'delete':
                return Backbone.sync(method, model, options);
            case 'read':
                options.url = BASE_URL + '/score/v1/get_user_scores';
                options.contentType = 'application/json';
                options.method = "POST";
                options.data = JSON.stringify({
                    'user_name': user.get('user_name')
                });
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    }
});

var tsModel = new TopScoresModel();
