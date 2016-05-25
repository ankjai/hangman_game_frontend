var RankingModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                return Backbone.sync(method, model, options);
            case 'update':
                return Backbone.sync(method, model, options);
            case 'delete':
                return Backbone.sync(method, model, options);
            case 'read':
                console.log('in RankingModel read');
                options.url = BASE_URL + '/score/v1/get_user_ranking';
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

var rankingModel = new RankingModel();
