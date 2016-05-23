var GameReplayView = Backbone.View.extend({
    el: '#game-replay',
    template: _.template($('#game-replay-template').html()),
    initialize: function() {},
    render: function() {
        // clean up
        $("#game-replay").empty();

        this.$el.html(this.template({
            'steps': gameHistoryModel.get('steps')
        }));

        return this;
    }
});
