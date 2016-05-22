var LoginView = Backbone.View.extend({
    el: '#login',
    events: {
        'click': 'gconnect'
    },
    gconnect: function(e) {
        auth();
    },
    template: _.template($('#login-template').html()),
    initialize: function() {},
    render: function() {
        this.$el.html(this.template);

        return this;
    }
});

var loginView = new LoginView();
