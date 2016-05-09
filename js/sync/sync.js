Backbone.sync = function(method, model, options) {
    switch (method) {
        case 'create':
            googleAPI.create(model, options);
            break;

        case 'update':
            googleAPI.update(model, options);
            break;

        case 'delete':
            googleAPI.destroy(model, options);
            break;

        case 'read':
            googleAPI.list(model, options);
            break;

        default:
            console.error('Unknown method:', method);
            break;
    }
}
