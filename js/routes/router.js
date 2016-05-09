var Router = Backbone.Router.extend({
    routes: {
        '': 'login',
        'game': 'game',
        'score': 'score',
        'profile': 'profile'
    }
});

// initialize router
var router = new Router();

router.on('route:login', function(page) {
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

router.on('route:score', function(page) {
    console.log('in score');
    scoreView.render();
});

router.on('route:profile', function(page) {
    console.log('in profile');
    profileView.render();
});

Backbone.history.start();
