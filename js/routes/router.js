var Router = Backbone.Router.extend({
    routes: {
        '': 'app',
        'board': 'board',
        'profile': 'profile',
        'game': 'game'
    }
});

// initialize router
var router = new Router();

router.on('route:app', function(page) {
    // add logic to redirect page directly
    // to gameboard if access_token is valid
    console.log('ACCESS_TOKEN:' + ACCESS_TOKEN);
    if (ACCESS_TOKEN == undefined) {
        loginView.render();
    } else {
        appView.render();
    }
});

router.on('route:board', function(page) {
    console.log('in board');
    appView.boardView.render();
});

router.on('route:profile', function(page) {
    console.log('in profile');
    appView.profileView.render();
});

router.on('route:game', function(page) {
    console.log('in game route');
    console.log(user);
    appView.gameView.render();
});

Backbone.history.start();
