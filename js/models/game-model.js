var GameModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                console.log('in create GameModel');
                options.url = BASE_URL + '/game/v1/new_game';
                options.contentType = 'application/json';
                options.method = "POST";
                options.success = newGameModel.successCallback;
                options.data = JSON.stringify({
                    'user_name': user.get('user_name'),
                    'game_name': $.now().toString()
                });
                return Backbone.sync(method, model, options);
            case 'update':
                console.log('in update GameModel');
                options.url = BASE_URL + '/game/v1/guess_char';
                options.contentType = 'application/json';
                options.method = "POST";
                return Backbone.sync(method, model, options);
            case 'delete':
                options.url = BASE_URL + '/game/v1/cancel_game?' + $.param({
                    'urlsafe_key': newGameModel.get('urlsafe_key'),
                    'user_name': user.get('user_name')
                });
                options.success = newGameModel.deleteSuccessCalbk;
                return Backbone.sync(method, model, options);
            case 'read':
                options.method = 'GET';
                return Backbone.sync(method, model, options);
            default:
                console.error('Unknown method:', method);
                break;
        }
    },
    successCallback: function(data, textStatus, jqXHR) {
        // after u get 'urlsafe_key'
        // do fetch this new game
        newGameModel.fetch({
            url: BASE_URL + '/game/v1/get_game?' + $.param({
                'urlsafe_key': data.urlsafe_key,
                'user_name': user.get('user_name')
            })
        });
    },
    deleteSuccessCalbk: function(data, textStatus, jqXHR) {
        // Removes all attributes from the model, including the id attribute
        newGameModel.clear();

        // start new game
        newGameModel.save();

        // fetch completed games
        compGamesModel.fetch();

        // alert user game over
        alert('Game Aborted!');

        // this will trigger 'read' method
        // and update board w/ latest data
        leaderboard.fetch({
            data: JSON.stringify({ 'fetch': 5 }),
            success: function() {
                // after successfully fetching latest
                // data, render the board again
                // TODO: RETHINK rankingsObjArray CREATION
                // USER NOW DOES NOT SEE UPDATED PERFORMANCE VALUE
                appView.boardView.render();
            }
        });
    }
});

var newGameModel = new GameModel();
