var GameView = Backbone.View.extend({
    el: '#game',
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

        this.$el.html(this.template());

        return this;
    }
});
