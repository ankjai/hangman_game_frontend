var ProfileView = Backbone.View.extend({
    'el': '#profile',
    events: {
        'click .btn-default': 'updateProfile'
    },
    updateProfile: function(e) {
        // api call to update user backend
        apiCall('/user/v1/update_user', 'POST', {
                "current_user_name": user.get('email_address'),
                "display_name": $('#displayName').val()
            })
            .done(function(data, textStatus, jqXHR) {
                // successfully updated user display_name 
                // in backend through api
                // now set user model
                user.set({
                    'name': jqXHR.responseJSON.display_name
                });

                // alert user that update happened
                // TODO: REPLACE IT W/ FLASH MSG
                alert('Display name updated: ' + user.get('name'));

                // once backend and user model is set
                // render profile page again
                profileView.render();
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log('ERROR:' + textStatus + ' ' + errorThrown);
                // console.log(jqXHR);
            });
    },
    template: _.template($('#profile-template').html()),
    initialize: function() {
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

        this.$el.html(this.template({ image_url: user.get('image_url'), name: user.get('name') }));

        return this;
    }
});

var profileView = new ProfileView();
