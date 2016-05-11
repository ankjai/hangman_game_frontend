var rankingsObjArray = [];
var displayNameObjArray = [];

var ScoreView = Backbone.View.extend({
    'el': '#score',
    template: _.template($('#score-template').html()),
    initialize: function() {
        apiCall('/score/v1/get_leaderboard',
            'POST',
            'json', { "fetch": 5 },
            this.getRankingsCallback,
            null);
    },
    getRankingsCallback: function(data, textStatus, jqXHR) {
        // get rankings obj for each user
        for (var key in data) {
            rankingsObjArray = data[key];
        }

        // retrieve display_name for all users
        // in rankingsObjArray
        for (var i = 0; i < rankingsObjArray.length; i++) {
            apiCall('/user/v1/get_user',
                'POST',
                'json', { "user_name": rankingsObjArray[i]['user_name'] },
                scoreView.getDisplayNameCallback,
                null);
        }
    },
    getDisplayNameCallback: function(data, textStatus, jqXHR) {
        displayNameObjArray.push(data['display_name']);
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
            rankings: rankingsObjArray,
            userDisplayNames: displayNameObjArray
        }));

        return this;
    }
});

var scoreView = new ScoreView();
