var ACCESS_TOKEN;

var auth = function() {
    var config = {
        'client_id': '207570027739-6amtrcj0ev0mlia7qogujtpk6iju2oqk.apps.googleusercontent.com',
        'scope': 'https://www.googleapis.com/auth/userinfo.email'
    };
    gapi.auth.authorize(config, function(authResult) {
        if (authResult && !authResult.error) {
            makeApiCall(authResult);
        } else {
            console.log('ERROR');
        }
    });
}

function makeApiCall(authResult) {
    // set access_token
    ACCESS_TOKEN = authResult.access_token;

    gapi.client.load('plus', 'v1').then(function() {
        var request = gapi.client.plus.people.get({
            'userId': 'me'
        });

        request.then(function(resp) {
            // set user model
            user.set({
                'image_url': getPathFromUrl(resp.result.image.url),
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

// helper function to remove the
// query string/params from the url
function getPathFromUrl(url) {
    return url.split("?")[0];
}

function getUserNameFromEmail(email) {
    return email.split("@")[0];
}
