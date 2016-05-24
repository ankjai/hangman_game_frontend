var CompGamesModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                console.log('in create CompGamesModel');
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'update':
                console.log('in update CompGamesModel');
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'delete':
                console.log('in delete CompGamesModel');
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'read':
                console.log('in read CompGamesModel');
                options.url = BASE_URL + '/game/v1/get_user_completed_games';
                options.method = "POST";
                options.data = JSON.stringify({
                    'user_name': user.get('user_name')
                });
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    },
});

var compGamesModel = new CompGamesModel();
