var ProfileView = Backbone.View.extend({
    'el': '#profile',
    events: {
        'click .btn-default': 'updateProfile'
    },
    updateProfile: function(e) {
        // update user model
        user.set({
            'display_name': $('#displayName').val()
        });

        // will call 'update' as 
        // user id is set
        user.save();

        // alert user that update happened
        // TODO: REPLACE IT W/ FLASH MSG
        alert('Display name updated: ' + user.get('display_name'));

        // once backend and user model is set
        // render profile page again
        appView.profileView.render();
    },
    template: _.template($('#profile-template').html()),
    initialize: function() {},
    render: function() {
        // clean up
        $("#board").empty();
        $("#game").empty();

        // update nav class
        $("#board-li").attr('class', '');
        $("#profile-li").attr('class', 'active');
        $("#game-li").attr('class', '');

        this.$el.html(this.template({ display_name: user.get('display_name') }));

        return this;
    }
});
