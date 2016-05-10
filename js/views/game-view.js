var AppView = Backbone.View.extend({
    el: '#gameboard',
    initialize: function() {
        this.render();
    },
    render: function() {
        // clean up
        $("#login").empty();
        $("#score").empty();
        $("#profile").empty();

        // update nav class
        $("#game-li").attr('class', 'active');
        $("#score-li").attr('class', '');
        $("#profile-li").attr('class', '');

        this.$el.html("appView content will be rendered here - update");
        
        return this;
    }
});

var appView = new AppView();
