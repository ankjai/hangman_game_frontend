var OauthRespObj;

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
            OauthRespObj = resp;

            // set image url to user model
            user.set({
                'image_url': OauthRespObj.result.image.url
            });

            // make api call
            apiCall('/user/v1/get_user', 'POST', 'json', { "user_name": OauthRespObj.result.emails[0].value }, updateUserModel, newUserCallback);
        });
    });
}

function newUserCallback() {
    apiCall('/user/v1/create_user', 'POST', 'json', {
        "display_name": OauthRespObj.result.name.givenName + ' ' + OauthRespObj.result.name.familyName,
        "email": OauthRespObj.result.emails[0].value,
        "user_name": OauthRespObj.result.emails[0].value
    }, updateUserModel, null);
}

function updateUserModel(data, textStatus, jqXHR) {
    console.log('in updateUserModel');
    // set user info
    user.set({
        'name': data['display_name'],
        'email_address': data['email']
    });

    // once user model is set
    // render game view
    appView.render();
}
