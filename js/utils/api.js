URL = "http://localhost:8080/_ah/api";

function apiCall(path, method, data) {
    var jqXHR = $.ajax({
        url: URL + path,
        type: method,
        dataType: 'json',
        data: JSON.stringify(data),
    });

    return jqXHR;
}
