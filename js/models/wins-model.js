var WinsModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                return Backbone.sync(method, model, options);
            case 'update':
                return Backbone.sync(method, model, options);
            case 'delete':
                return Backbone.sync(method, model, options);
            case 'read':
                options.url = BASE_URL + '/game/v1/get_user_games?' + $.param({
                    'user_name': user.get('user_name'),
                    'game_status': 'WON'
                });
                options.method = 'GET';
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    }
});

var winsModel = new WinsModel();
