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

        // TODO:shld this 'el' be appended to appView
        this.$el.html(this.template({
            rankings: rankingsObjArray
        }));

        return this;
    }
});
