var auth = function() {
    var config = {
        'client_id': '207570027739-6amtrcj0ev0mlia7qogujtpk6iju2oqk.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/userinfo.email'
    };
    gapi.auth.authorize(config, function(authResult) {
        if (authResult && !authResult.error) {
            makeApiCall(authResult.access_token);
        } else {
            console.log('ERROR');
        }
    });
}

function makeApiCall(access_token) {
    gapi.client.load('plus', 'v1').then(function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });

        request.then(function(resp) {
            // set user model
            user.set({
                'access_token': access_token,
                'image_url': resp.result.image.url,
                'display_name': resp.result.name.givenName + ' ' + resp.result.name.familyName,
                'email': resp.result.emails[0].value,
                'user_name': resp.result.emails[0].value
            });

            // save user model
            // this will trigger POST
            user.save();
        });
    });
}
