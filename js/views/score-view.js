var ScoreView = Backbone.View.extend({
    'el': '#score',
    initialize: function() {
        this.render();
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

        this.$el.html("score view");

        return this;
    }
});

var scoreView = new ScoreView();
