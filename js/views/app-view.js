var AppView = Backbone.View.extend({
    el: '#gameboard',
    initialize: function() {
        this.render();
    },
    render: function() {
        $("#login").empty();
        this.$el.html("appView content will be rendered here - update");
        return this;
    }
});

var appView = new AppView();
