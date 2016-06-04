var GameHistoryModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                options.method = 'GET';
                return Backbone.sync(method, model, options);
            case 'update':
                options.contentType = 'application/json';
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'delete':
                options.contentType = 'application/json';
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'read':
                options.contentType = 'application/json';
                options.method = "POST";
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    }
});

var gameHistoryModel = new GameHistoryModel();
