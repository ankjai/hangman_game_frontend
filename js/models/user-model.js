BASE_URL = "http://localhost:8080/_ah/api";
var globalUserIdCounter = 1;

var UserModel = Backbone.Model.extend({
    sync: function(method, model, options) {
        switch (method) {
            case 'create':
                options.url = BASE_URL + '/user/v1/create_user';
                options.success = user.successCallback;
                options.error = user.errorCallback;
                options.complete = user.completeCallback;
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
                options.data = JSON.stringify({
                    'user_name': model.attributes.user_name
                });
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

        // new user, new game
        // wait until backend creates user
        setTimeout(function() {
            newGameModel.save();
        }, 3000);
    },
    errorCallback: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status == 409) {
            // set user id
            // so that future .save() will call 'update'
            user.set({ 'id': globalUserIdCounter });

            // increment the counter
            globalUserIdCounter++;

            // fetch active game
            newGameModel.fetch({
                url: BASE_URL + '/game/v1/get_user_games',
                data: JSON.stringify({
                    'user_name': user.get('user_name'),
                    "game_status": "IN_SESSION"
                }),
                success: function(data, textStatus, jqXHR) {
                    if (data.attributes['games'] != undefined && !data.attributes['games'][0].game_over) {
                        // get existing game
                        newGameModel.fetch({
                            url: BASE_URL + '/game/v1/get_game',
                            data: JSON.stringify({
                                'urlsafe_key': data.attributes['games'][0].game_urlsafe_key,
                                'user_name': user.get('user_name')
                            })
                        });
                    } else {
                        // create new game
                        newGameModel.save();
                    }
                }
            });

            // fetch completed games
            compGamesModel.fetch();

            // fetch user from DB if user exists
            // to get things that are updated like display_name
            user.fetch();
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
            console.error(msg);

            // render login view
            loginView.render();
        }
    },
    completeCallback: function(jqXHR, textStatus) {
        console.log('in completeCallback');
        // get user ranking
        rankingModel.fetch({
            success: function(data, textStatus, jqXHR) {
                // render app view
                appView.render();
            }
        });

        // get user high score
        hsModel.fetch({
            success: function(data, textStatus, jqXHR) {
                // render app view
                appView.render();
            }
        });

        // get user wins
        winsModel.fetch({
            success: function(data, textStatus, jqXHR) {
                // render app view
                appView.render();
            }
        });

        // get user wins
        tsModel.fetch({
            success: function(data, textStatus, jqXHR) {
                // render board view
                appView.boardView.render();
            }
        });

        // render game view
        appView.render();

    }
});

var user = new UserModel();
