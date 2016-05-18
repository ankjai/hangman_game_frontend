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
        profileView.render();
    },
    template: _.template($('#profile-template').html()),
    initialize: function() {
        // TODO: REMOVE THIS RENDER
        this.render();
    },
    render: function() {
        // clean up
        $("#login").empty();
        $("#gameboard").empty();
        $("#score").empty();

        // update nav class
        $("#game-li").attr('class', '');
        $("#score-li").attr('class', '');
        $("#profile-li").attr('class', 'active');

        this.$el.html(this.template({ image_url: user.get('image_url'), name: user.get('display_name') }));

        return this;
    }
});

var profileView = new ProfileView();
