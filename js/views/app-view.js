var AppView = Backbone.View.extend({
    // el
    el: '#container',
    // initialize
    initialize: function() {
        // body...
        this.render();
    },
    // render
    render: function() {
        // body...
        this.$el.html("<h1>hello</h1>");
    }
});

var appView = new AppView();
