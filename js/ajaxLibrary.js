function ajaxLibrary() {

}

ajaxLibrary.prototype = {
    "base": function (url, method, data, callback) {
        var response = {};
        $.ajax({
            url: url,
            method: method,
            //data: JSON.stringify(data),
            data: data ? JSON.stringify(data) : "{}",
            dataType: "json",

            contentType: "application/json; charset=utf-8",

            success: function (data, textStatus, httpRequest) {
                var totalRecords = httpRequest.getResponseHeader('X-total-count');
                response["status"] = textStatus;
                response["totalRecords"] = totalRecords ? totalRecords : 0;
                response["data"] = data;
                callback("", response);
            },
            error: function (request, textStatus, errorThrown) {
                //alert("fail condition"+JSON.stringify(data))
                response["status"] = textStatus;
                response["error"] = errorThrown;
                callback(response, {});
            }
        });

    },
    "get": function (url, data, callback) {
        this.base(url, "GET", data, callback);
    },
    "post": function (url, data, callback) {
        this.base(url, "POST", data, callback);
    },
    "delete": function (url, data, callback) {
        this.base(url, "DELETE", data, callback);
    },
    "put": function (url, data, callback) {
        this.base(url, "PUT", data, callback);
    }

}
