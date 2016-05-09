var LoginView = Backbone.View.extend({
    el: '#login',
    events: {
        'click': 'gconnect'
    },
    gconnect: function(e) {
        auth();
    },
    template: _.template($('#login-template').html()),
    initialize: function() {
        this.render();
    },
    render: function() {
        // clean up
        $("#gameboard").empty();
        $("#score").empty();
        $("#profile").empty();

        // update nav class
        $("#game-li").attr('class', '');
        $("#score-li").attr('class', '');
        $("#profile-li").attr('class', '');

        this.$el.html(this.template);
        
        return this;
    }
});

var loginView = new LoginView();
