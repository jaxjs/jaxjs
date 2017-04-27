/**
 * http.js
 */
(function(window){
    window.jax.http = {
        requests  : [],
        responses : [],
        response  : null,
        methods   : ['GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],

        /** Function to send AJAX requests */
        send : function(url, opts) {
            // Create a new request object.
            var currentIndex = window.jax.random(100000, 999999);
            window.jax.http.requests[currentIndex] = (window.XMLHttpRequest) ? new XMLHttpRequest() : false;

            // Get options
            var method   = ((opts != undefined) && (opts.method != undefined))   ? opts.method.toUpperCase() : 'GET';
            var headers  = ((opts != undefined) && (opts.headers != undefined))  ? opts.headers : null;
            var username = ((opts != undefined) && (opts.username != undefined)) ? opts.username : null;
            var password = ((opts != undefined) && (opts.password != undefined)) ? opts.password : null;
            var async    = ((opts != undefined) && (opts.async != undefined))    ? opts.async : false;
            var data     = ((opts != undefined) && (opts.data != undefined))     ? window.jax.http.buildQuery(opts.data) : null;
            var type     = ((opts != undefined) && (opts.type != undefined))     ? opts.type : null;
            var status   = ((opts != undefined) && (opts.status != undefined))   ? opts.status : null;
            var progress = ((opts != undefined) && (opts.progress != undefined)) ? opts.progress : null;
            var trace    = ((opts != undefined) && (opts.trace != undefined))    ? opts.trace : null;
            var fields   = ((opts != undefined) && (opts.fields != undefined))   ? opts.fields : false;

            if ((window.jax.http.methods.indexOf(method) != -1) && (window.jax.http.requests[currentIndex])) {
                if ((method == 'GET') || (method == 'HEAD') || (method == 'OPTIONS')) {
                    url += '?' + data;
                    data = null;
                }

                // Open request
                if ((username != null) && (password != null)) {
                    window.jax.http.requests[currentIndex].open(method, url, async, username, password);
                } else {
                    window.jax.http.requests[currentIndex].open(method, url, async);
                }

                if ((data != null) && ((method == 'POST') || (method == 'PUT') || (method == 'PATCH') || (method == 'DELETE'))) {
                    if (data.constructor != FormData) {
                        window.jax.http.requests[currentIndex].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        if (data.length != undefined) {
                            window.jax.http.requests[currentIndex].setRequestHeader('Content-Length', data.length.toString());
                        }
                        window.jax.http.requests[currentIndex].setRequestHeader('Connection', 'close');
                    }
                }

                // Add progress
                if (progress != null) {
                    if (((method == 'GET') || (method == 'HEAD') || (method == 'OPTIONS')) &&
                        (window.jax.http.requests[currentIndex].onprogress != undefined)) {
                        window.jax.http.requests[currentIndex].onprogress = progress;
                    } else if (((method == 'POST') || (method == 'PUT') || (method == 'PATCH') || (method == 'DELETE')) &&
                        (window.jax.http.requests[currentIndex].upload != undefined)) {
                        window.jax.http.requests[currentIndex].upload.addEventListener('progress', progress, false);
                    }
                }

                // If additional headers are set, send them
                if (headers != null) {
                    for (var header in headers) {
                        window.jax.http.requests[currentIndex].setRequestHeader(header, headers[header]);
                    }
                }

                // If status function handlers have been set, the set the onreadystatechange
                if (status != null) {
                    window.jax.http.requests[currentIndex].onreadystatechange = function() {
                        if (window.jax.http.requests[currentIndex].readyState == 4) {
                            var response = window.jax.http.processResponse(currentIndex);

                            if (status[response.status] != undefined) {
                                if (typeof status[response.status] == 'function') {
                                    status[response.status](response);
                                } else if (status[response.status].constructor == Array) {
                                    for (var i = 0; i < status[response.status].length; i++) {
                                        if (typeof status[response.status][i] == 'function') {
                                            status[response.status][i](response);
                                        }
                                    }
                                }
                            } else if (status['error']) {
                                if (typeof status['error'] == 'function') {
                                    status['error'](response);
                                } else if (status['error'].constructor == Array) {
                                    for (var i = 0; i < status['error'].length; i++) {
                                        if (typeof status['error'][i] == 'function') {
                                            status['error'][i](response);
                                        }
                                    }
                                }
                            }
                        }
                        if (trace != null) {
                            trace.apply(undefined, [response]);
                        }
                    };
                }

                // Send the request
                window.jax.http.requests[currentIndex].send(data);

                var response = (window.jax.http.responses[currentIndex] == undefined) ?
                    window.jax.http.processResponse(currentIndex) : window.jax.http.responses[currentIndex];

                return window.jax.http.parseResponse(response, type, async, trace, fields);
            } else {
                throw (!window.jax.http.requests[currentIndex]) ?
                    'Error: Could not create a request object.' :
                    'Error: That request method was not allowed.';
            }
        },

        /** Alias function to send a GET AJAX request */
        get : function(url, opts) {
            if (opts == undefined) {
                opts = {"method" : 'GET'};
            } else {
                opts.method = 'GET';
            }
            return window.jax.http.send(url, opts);
        },

        /** Alias function to send a HEAD AJAX request */
        head : function(url, opts) {
            if (opts == undefined) {
                opts = {"method" : 'HEAD'};
            } else {
                opts.method = 'HEAD';
            }
            return window.jax.http.send(url, opts);
        },

        /** Alias function to send a OPTIONS AJAX request */
        options : function(url, opts) {
            if (opts == undefined) {
                opts = {"method" : 'OPTIONS'};
            } else {
                opts.method = 'OPTIONS';
            }
            return window.jax.http.send(url, opts);
        },

        /** Alias function to send a POST AJAX request */
        post : function(url, opts) {
            if (opts == undefined) {
                opts = {"method" : 'POST'};
            } else {
                opts.method = 'POST';
            }
            return window.jax.http.send(url, opts);
        },

        /** Alias function to send a PUT AJAX request */
        put : function(url, opts) {
            if (opts == undefined) {
                opts = {"method" : 'PUT'};
            } else {
                opts.method = 'PUT';
            }
            return window.jax.http.send(url, opts);
        },

        /** Alias function to send a DELETE AJAX request */
        delete : function(url, opts) {
            if (opts == undefined) {
                opts = {"method" : 'DELETE'};
            } else {
                opts.method = 'DELETE';
            }
            return window.jax.http.send(url, opts);
        },

        /** Function to get the HTTP request status of a URL */
        status : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status;
        },

        /** Function to determine if the HTTP request is successful */
        isSuccess : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return ((type == 3) || (type == 2) || (type == 1));
        },

        /** Function to determine if the HTTP request is a redirect */
        isRedirect : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return (type == 3);
        },

        /** Function to determine if the HTTP request is an error */
        isError : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return ((type == 5) || (type == 4));
        }
    };
})(window);
