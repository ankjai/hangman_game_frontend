var UserModel = Backbone.Model.extend({
    initialize: function() {}
});

var user = new UserModel({
    access_token: undefined,
    name: undefined,
    email_address: undefined,
    image_url: undefined
});
