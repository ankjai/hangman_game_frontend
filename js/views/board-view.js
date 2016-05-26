var rankingsObjArray = [];

var BoardView = Backbone.View.extend({
    'el': '#board',
    template: _.template($('#board-template').html()),
    initialize: function() {},
    render: function() {
        console.log('in boardView render');
        // clean up
        $("#profile").empty();
        $("#game").empty();
        $("#replay").empty();

        // update nav class
        $("#board-li").attr('class', 'active');
        $("#profile-li").attr('class', '');
        $("#game-li").attr('class', '');

        // user top scores
        var userTopScores = [];
        if (tsModel.get('items')) {
            for (var i = 0; i < tsModel.get('items').length; i++) {
                if (i >= 5) {
                    break;
                };
                if (tsModel.get('items')[i].game_score <= 0) {
                    break;
                };
                userTopScores.push(tsModel.get('items')[i]);
            }
        }

        // TODO:shld this 'el' be appended to appView
        this.$el.html(this.template({
            rankings: rankingsObjArray,
            topScores: userTopScores
        }));

        return this;
    }
});
