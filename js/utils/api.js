URL = "http://localhost:8080/_ah/api";

function apiCall(path, method, dataType, data, doneCallback, failCallback) {
    var jqXHR = $.ajax({
        url: URL + path,
        type: method,
        dataType: dataType,
        data: JSON.stringify(data),
    });

    jqXHR
        .done(function(data, textStatus, jqXHR) {
            // console.log('IN DONE');
            // console.log(data);
            // console.log(doneCallback);
            if (doneCallback != null) {
                doneCallback(data, textStatus, jqXHR);
            }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            // Error logic here
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }

            if (failCallback != null) {
                failCallback(jqXHR, msg);
            }
        });
}
