var rankingsObjArray = [];

var ScoreView = Backbone.View.extend({
    'el': '#score',
    template: _.template($('#score-template').html()),
    initialize: function() {
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
        $("#gameboard").empty();
        $("#profile").empty();

        // update nav class
        $("#game-li").attr('class', '');
        $("#score-li").attr('class', 'active');
        $("#profile-li").attr('class', '');

        this.$el.html(this.template({
            rankings: rankingsObjArray
        }));

        return this;
    }
});

var scoreView = new ScoreView();
