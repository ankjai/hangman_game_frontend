var GameHistoryModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                console.log('in create GameHistoryModel');
                options.url = BASE_URL + '/game/v1/get_game_history';
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'update':
                console.log('in update GameHistoryModel');
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'delete':
                console.log('in delete GameHistoryModel');
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'read':
                console.log('in read GameHistoryModel');
                options.method = "POST";
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    }
});

var gameHistoryModel = new GameHistoryModel();
