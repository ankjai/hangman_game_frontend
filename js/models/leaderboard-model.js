var LeaderBoardModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                return Backbone.sync(method, model, options);
            case 'update':
                return Backbone.sync(method, model, options);
            case 'delete':
                return Backbone.sync(method, model, options);
            case 'read':
                options.url = BASE_URL + '/score/v1/get_leaderboard?' + $.param({
                    'fetch': 5
                });
                options.method = 'GET';
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    }
});

var leaderboard = new LeaderBoardModel();

// this will trigger 'read' method
leaderboard.fetch();
