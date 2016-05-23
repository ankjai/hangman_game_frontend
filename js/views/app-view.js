var AppView = Backbone.View.extend({
    el: '#app',
    template: _.template($('#app-template').html()),
    initialize: function() {
        /**
         * the rankingsObjArray will be consumed by boardView.render(),
         * but since boardView is subview of appView and boardView initialized
         * function wont be called until appView.render(), it is logical to prep
         * rankingsObjArray in appView.initialize() as data will be ready
         * when we call boardView.render()
         */

        // execute this function once leaderboard
        // obj is fetched
        setTimeout(function() {
            // first create anonymous UserModel obj for
            // top 5 rankers and save it i rankingsObjArray
            for (var i = 0; i < leaderboard.get('rankings').length; i++) {
                var tempUser = new UserModel({
                    'user_name': leaderboard.get('rankings')[i].user_name,
                    'user_performance': leaderboard.get('rankings')[i].user_performance,
                    'user_ranking': leaderboard.get('rankings')[i].user_ranking
                });
                rankingsObjArray.push(tempUser);
            }

            // now do fetch on these anonymous UserModel objs so that
            // it merges the model's state with attributes fetched from the server
            // NOW the rankingsObjArray's UserModel objs will have all attr needed for
            // table: display_name, email, user_name, user_performance, user_ranking
            for (var i = 0; i < rankingsObjArray.length; i++) {
                rankingsObjArray[i].fetch({
                    data: JSON.stringify({
                        'user_name': rankingsObjArray[i].attributes.user_name
                    })
                });
            }
        }, 3000);
    },
    render: function() {
        // clean up
        $("#login").empty();

        this.$el.html(this.template({
            image_url: user.get('image_url'),
            display_name: user.get('display_name'),
            email: user.get('email'),
            user_name: getUserNameFromEmail(user.get('user_name'))
        }));

        // create/initialize subviews here
        this.boardView = new BoardView();
        this.profileView = new ProfileView();
        this.gameView = new GameView();
        this.replayView = new ReplayView();

        // render board 
        this.boardView.render();

        return this;
    }
});

var appView = new AppView();
