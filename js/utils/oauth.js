var auth = function() {
    var config = {
        'client_id': '207570027739-6amtrcj0ev0mlia7qogujtpk6iju2oqk.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/userinfo.email'
    };
    gapi.auth.authorize(config, function(authResult) {
        // set token to user model
        user.set({
            'access_token': authResult.access_token
        });
        if (authResult && !authResult.error) {
            makeApiCall();
        } else {
            console.log('ERROR');
        }
    });
}

function makeApiCall() {
    gapi.client.load('plus', 'v1').then(function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });

        request.then(function(resp) {
            var name = resp.result.name.givenName + ' ' + resp.result.name.familyName;
            var email_address = resp.result.emails[0].value;
            var image_url = resp.result.image.url;

            // set image url to user model
            user.set({
                'image_url': image_url
            });

            // check if user exists
            var jqXHRGetUser = apiCall('/user/v1/get_user', 'POST', { "user_name": email_address });
            jqXHRGetUser
                .done(function(data, textStatus, jqXHR) {
                    // user exists
                    // do not recreate user thru api
                    console.log('user exists');
                    updateUserModel(jqXHR);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    // user does not exists
                    // create user for 1st time thru api
                    console.log('user does not exists');

                    var jqXHRUserCreated = apiCall('/user/v1/create_user', 'POST', {
                        "display_name": name,
                        "email": email_address,
                        "user_name": email_address
                    });
                    jqXHRUserCreated
                        .done(function(data, textStatus, jqXHR) {
                            // user created
                            console.log('user created' + textStatus);
                            updateUserModel(jqXHR);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            // error while user creation
                            console.log('ERROR while user creation:' + errorThrown);
                        });
                });
        });
    });
}

function updateUserModel(jqXHR) {
    // set user info
    user.set({
        'name': jqXHR.responseJSON.display_name,
        'email_address': jqXHR.responseJSON.email
    });

    // once user model is set
    // redirect page to game board
    window.location.href = '#game';
}
