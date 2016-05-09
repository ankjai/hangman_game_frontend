var Router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'game': 'game'
    }
});

// initialize router
var router = new Router();

router.on('route:home', function(page) {
    // add logic to redirect page directly
    // to gameboard if access_token is valid
    if (user.get('access_token') == undefined) {
        loginView.render();
    } else {
        appView.render();
    }
});

router.on('route:game', function(page) {
    console.log('in game route');
    console.log(user);
    appView.render();
});

Backbone.history.start();
