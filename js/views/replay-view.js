var ReplayView = Backbone.View.extend({
    el: '#replay',
    template: _.template($('#replay-template').html()),
    events: {
        'click #replay-btn': 'getCompletedGame'
    },
    getCompletedGame: function(e) {
        var that = this;

        // get game history
        gameHistoryModel.save({}, {
            url: BASE_URL + '/game/v1/get_game_history?' + $.param({
                'urlsafe_key': $('#replay-select').val(),
                'user_name': user.get('user_name')
            }),
            success: function(data, textStatus, jqXHR) {
                // render game-replay-view
                that.gameReplayView = new GameReplayView();
                that.gameReplayView.render();
            }
        });
    },
    initialize: function() {},
    render: function() {
        // clean up
        $("#board").empty();
        $("#profile").empty();
        $("#game").empty();

        // update nav class
        $("#board-li").attr('class', '');
        $("#profile-li").attr('class', '');
        $("#game-li").attr('class', 'active');

        this.$el.html(this.template({
            'games': compGamesModel.get('games')
        }));

        return this;
    }
});
