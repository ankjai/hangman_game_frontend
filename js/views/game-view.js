var GameView = Backbone.View.extend({
    el: '#game',
    events: {
        'click #guess-btn': 'doGuess',
        'click #cancel-btn': 'doCancel'
    },
    doGuess: function(e) {
        //save newGameModel
        //this will trigger 'update'
        newGameModel.save({}, {
            data: JSON.stringify({
                'char': $('#char').val(),
                'urlsafe_key': newGameModel.get('urlsafe_key'),
                'user_name': user.get('user_name')
            }),
            success: function(data, textStatus, jqXHR) {
                var word = newGameModel.get('word');

                if (newGameModel.get('game_over')) {
                    // Removes all attributes from the model, including the id attribute
                    newGameModel.clear();

                    // start new game
                    newGameModel.save();

                    // alert user game over
                    alert('Game Over! The word was: ' + word);

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
                } else {
                    // after response, render the view again
                    appView.gameView.render();
                }
            }
        });
    },
    doCancel: function() {
        // destroy/delete current newGameModel
        newGameModel.destroy();
    },
    template: _.template($('#game-template').html()),
    initialize: function() {},
    render: function() {
        // clean up
        $("#board").empty();
        $("#profile").empty();

        // update nav class
        $("#board-li").attr('class', '');
        $("#profile-li").attr('class', '');
        $("#game-li").attr('class', 'active');

        this.$el.html(this.template({
            game_status: newGameModel.get('game_status'),
            guessed_chars_of_word: newGameModel.get('guessed_chars_of_word'),
            guesses_left: newGameModel.get('guesses_left')
        }));

        return this;
    }
});
