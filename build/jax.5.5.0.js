/**
 * jax javascript library (http://www.jaxjs.org/)
 *
 * @link       https://github.com/jaxjs/jaxjs
 * @category   jax
 * @author     Nick Sagona, III <dev@nolainteractive.com>
 * @copyright  Copyright (c) 2009-2017 NOLA Interactive, LLC. (http://www.nolainteractive.com)
 * @license    http://www.jaxjs.org/license     New BSD License
 * @version    5.5.0
 * @build      Apr 6, 2017 10:03:00
 */
(function(window){
    window.jax = {
        version : '5.5.0'  
    };
    window.jax.rand = null;

    /** Function to generate a unique random number */
    window.jax.random = function(num1, num2) {
        var range;
        var rand;

        if ((num1 < 0) && (num2 < 0)) {
            range = Math.abs(num1 - num2);
        } else if ((num1 < 0) && (num2 >= 0)) {
            range = Math.abs(num2 - num1);
        } else {
            range = num2 - num1;
        }

        if ((window.jax.rand == undefined) || (window.jax.rand.length > range)) {
            window.jax.rand = [];
        }

        rand = Math.floor(Math.random() * (range + 1)) + num1;
        while (window.jax.rand.indexOf(rand) != -1) {
            rand = Math.floor(Math.random() * (range + 1)) + num1;
        }

        window.jax.rand.push(rand);
        return rand;
    };

    /** Function to get a variable or variables from the query string */
    window.jax.query = function(key, u) {
        var vars = [];
        var url = (u != null) ? u : location.href;

        if (url.indexOf('?') != -1) {
            var varString = url.substring(url.indexOf('?') + 1);
            if (varString.indexOf('#') != -1) {
                varString = varString.substring(0, varString.indexOf('#'));
            }
            var varsAry = varString.split('&');
            for (var i = 0; i < varsAry.length; i++) {
                var gV = varsAry[i].split('=');
                vars[gV[0]] = decodeURIComponent(gV[1]);
            }
        }

        // If key was passed
        if ((key != undefined) && (key != null)) {
            return (vars[key] != undefined) ? vars[key] : undefined;
            // Else, return entire array
        } else {
            return vars;
        }
    };

    /** Function to return the target identifier of the document's URI */
    window.jax.target = function(u) {
        var url = (u != null) ? u : location.href;
        var target = null;
        if (url.indexOf('#') != -1) {
            target = url.substring(url.indexOf('#') + 1);
        }
        return target;
    };

    /** Function to fire before window is unloaded */
    window.jax.beforeunload = function(func) {
        // Get old beforeunload function(s), if they exist.
        var oldBeforeUnLoad = window.onbeforeunload;

        if (typeof window.onbeforeunload != 'function') {
            window.onbeforeunload = func;
        } else {
            window.onbeforeunload = function() {
                if (oldBeforeUnLoad) {
                    oldBeforeUnLoad();
                }
                func();
            };
        }
    };
})(window);

/**
 * http.js
 */
(function(window){
    window.jax.http = {
        current   : 0,
        requests  : [],
        responses : [],
        response  : null,
        methods   : [
            'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'DELETE'
        ],

        /** Function to send AJAX requests */
        send : function(url, opts) {
            // Create a new request object.
            window.jax.http.current = window.jax.random(100000, 999999);
            window.jax.http.requests[window.jax.http.current] = (window.XMLHttpRequest) ? new XMLHttpRequest() : false;

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

            if ((window.jax.http.methods.indexOf(method) != -1) && (window.jax.http.requests[window.jax.http.current])) {
                // Open request
                if ((username != null) && (password != null)) {
                    window.jax.http.requests[window.jax.http.current].open(method, url, async, username, password);
                } else {
                    window.jax.http.requests[window.jax.http.current].open(method, url, async);
                }

                if (data != null) {
                    if ((method == 'GET') || (method == 'HEAD') || (method == 'OPTIONS')) {
                        url += '?' + data;
                        data = null;
                    } else if ((method == 'POST') || (method == 'PUT') || (method == 'DELETE')) {
                        if (data.constructor != FormData) {
                            window.jax.http.requests[window.jax.http.current].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                            if (data.length != undefined) {
                                window.jax.http.requests[window.jax.http.current].setRequestHeader('Content-Length', data.length.toString());
                            }
                            window.jax.http.requests[window.jax.http.current].setRequestHeader('Connection', 'close');
                        }
                    }
                }

                // Add progress
                if (progress != null) {
                    if (((method == 'GET') || (method == 'HEAD') || (method == 'OPTIONS')) &&
                        (window.jax.http.requests[window.jax.http.current].onprogress != undefined)) {
                        window.jax.http.requests[window.jax.http.current].onprogress = progress;
                    } else if (((method == 'POST') || (method == 'PUT') || (method == 'DELETE')) &&
                        (window.jax.http.requests[window.jax.http.current].upload != undefined)) {
                        window.jax.http.requests[window.jax.http.current].upload.addEventListener('progress', progress, false);
                    }
                }

                // If additional headers are set, send them
                if (headers != null) {
                    for (var header in headers) {
                        window.jax.http.requests[window.jax.http.current].setRequestHeader(header, headers[header]);
                    }
                }

                // If status function handlers have been set, the set the onreadystatechange
                if (status != null) {
                    window.jax.http.requests[window.jax.http.current].onreadystatechange = function() {
                        if (window.jax.http.requests[window.jax.http.current].readyState == 4) {
                            var response = (window.jax.http.responses[window.jax.http.current] == undefined) ?
                                window.jax.http.processResponse(window.jax.http.current) : window.jax.http.responses[window.jax.http.current];

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
                window.jax.http.requests[window.jax.http.current].send(data);

                var response = (window.jax.http.responses[window.jax.http.current] == undefined) ?
                    window.jax.http.processResponse(window.jax.http.current) : window.jax.http.responses[window.jax.http.current];

                return window.jax.http.parseResponse(response, type, async, trace, fields);
            } else {
                throw (!window.jax.http.requests[window.jax.http.current]) ?
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

/**
 * http/response.js
 */
(function(window){
    /** Function to parse a response */
    window.jax.http.parseResponse = function(response, type, async, trace, fields) {
        var obj;
        var delim;

        // Detect application type
        if (type == null) {
            // Try from response object content type header
            if ((response.headers != undefined) && (response.headers['Content-Type'] != undefined)) {
                if (response.headers['Content-Type'].toLowerCase().indexOf('text/plain') != -1) {
                    type = 'txt';
                } else if (response.headers['Content-Type'].toLowerCase().indexOf('json') != -1) {
                    type = 'json';
                } else if (response.headers['Content-Type'].toLowerCase().indexOf('xml') != -1) {
                    type = 'xml';
                } else if (response.headers['Content-Type'].toLowerCase().indexOf('csv') != -1) {
                    type = 'csv';
                    delim = ',';
                } else if (response.headers['Content-Type'].toLowerCase().indexOf('tsv') != -1) {
                    type = 'tsv';
                    delim = "\t";
                }
            // Else, if string, try to detect from string
            } else if (typeof response == 'string') {
                if (response.substr(0, 5) == '<?xml') {
                    type = 'xml';
                } else if (response.substr(0, 1) == '{') {
                    type = 'json';
                } else {
                    var validCsv = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
                    var validTsv = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^\t'"\s\\]*(?:\s+[^\t'"\s\\]+)*)\s*(?:\t\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^\t'"\s\\]*(?:\s+[^\t'"\s\\]+)*)\s*)*$/;
                    if (validCsv.test(response)) {
                        type = 'csv';
                        delim = ',';
                    } else if (validTsv.test(response)) {
                        type = 'tsv';
                        delim = "\t";
                    }
                }
            }
        }

        switch (type) {
            // Parse TXT response
            case 'txt':
                obj = response.text.toString();
                break;
            // Parse JSON response
            case 'json':
                try {
                    obj = JSON.parse(decodeURIComponent(response.text));
                } catch (e) {
                    obj = JSON.parse(response.text);
                }
                break;

            // Parse XML response
            case 'xml':
                // Get XML doc from string if doesn't exist
                if (!response.xml) {
                    var str = (response.text != undefined) ? response.text : response.toString();
                    if ("ActiveXObject" in window) {
                        var xDoc = new ActiveXObject('Microsoft.XMLDOM');
                        xDoc.async = (async != undefined) ? async : true;
                        xDoc.loadXML(str);
                    } else {
                        var parser = new DOMParser();
                        var xDoc = parser.parseFromString(str, 'text/xml');
                    }
                // Else, get XML doc
                } else {
                    var xDoc = response.xml;
                }

                var docObj = 'var xml = ';

                function traverse(tree, objStr) {
                    var attribs = [];
                    var attribStr = '';
                    if (tree.attributes != undefined) {
                        for (var j = 0; j < tree.attributes.length; j++) {
                            var nodeValue = tree.attributes[j].nodeValue
                                .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                                .replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\(/g, '&#40;')
                                .replace(/\)/g, '&#41;').replace(/\//g, '&#47;')
                                .replace(/:/g, '&#58;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
                                .replace(/\\/g, '&#92;').replace(/{/g, '&#123;').replace(/}/g, '&#125;')
                                .replace(/\"/g, '\\"').replace(/\n/g, '\\n');
                            attribs.push(tree.attributes[j].nodeName + ' : "' + nodeValue + '"');
                        }
                    }
                    if (tree.hasChildNodes()) {
                        var regex = /^\s*$/;
                        var nValue = '';
                        for (var i = 0; i < tree.childNodes.length; i++) {
                            if ((tree.childNodes[i].nodeType == 3) && (!regex.test(tree.childNodes[i].nodeValue))) {
                                nValue += tree.childNodes[i].nodeValue;
                            }
                        }
                        nValue = nValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/\(/g, '&#40;')
                            .replace(/\)/g, '&#41;').replace(/\//g, '&#47;')
                            .replace(/:/g, '&#58;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
                            .replace(/\\/g, '&#92;').replace(/{/g, '&#123;').replace(/}/g, '&#125;')
                            .replace(/\"/g, '\\"').replace(/\n/g, '\\n');
                        attribs.push('nodeValue : "' + nValue + '"');
                        if (attribs.length > 0) {
                            attribStr = '{' + attribs.join(', ');
                        }
                        objStr += '{' + tree.tagName + ' : ' + attribStr + ', nodes : [';
                        for (var i = 0; i < tree.childNodes.length; i++) {
                            objStr += traverse(tree.childNodes[i], '');
                        }
                        objStr += ']}},';
                    } else {
                        if (tree.nodeValue == null) {
                            attribs.push('nodeValue : ""');
                            if (attribs.length > 0) {
                                attribStr = '{' + attribs.join(', ') + '}';
                            }
                            objStr += '{' + tree.tagName + ' : ' + attribStr + '}';
                        }
                    }
                    return objStr;
                }

                if (xDoc.childNodes.length > 0) {
                    if ("ActiveXObject" in window) {
                        docObj += traverse(xDoc.documentElement, '');
                    } else {
                        if (xDoc.childNodes[0].nodeType == 10) {
                            docObj += traverse(xDoc.childNodes[1], '');
                        } else {
                            docObj += traverse(xDoc.childNodes[0], '');
                        }
                    }
                } else {
                    docObj += '{}';
                }

                // Some clean up on the docObj string.
                if (docObj.charAt(docObj.length - 1) == ',') {
                    docObj = docObj.substring(0, (docObj.length - 1));
                }

                eval(docObj);
                obj = xml;
                break;

            // Parse CSV or TSV response
            case 'csv':
            case 'tsv':
                var start = 0;
                var csvDoc = (response.text != undefined) ? response.text : response.toString();
                var csvObj = 'var csv = ';
                var csvRows = [];

                var csvAry = csvDoc.replace(/\r/g, "").split("\n");

                if (fields) {
                    var csvFields = csvAry[0].split(delim);
                    var start = 1;
                }

                var csvAryLen = csvAry.length;
                for (var k = start; k < csvAryLen; k++) {
                    if (csvAry[k] != '') {
                        if (csvAry[k].indexOf('"') != -1) {
                            var matches = csvAry[k].match(/"([^"]*)"/g);
                            var filtered = [];
                            if (matches.length > 0) {
                                var matlen = matches.length;
                                for (var m = 0; m < matlen; m++) {
                                    var filt = matches[m].replace(/,/g, '[{c}]');
                                    filt = filt.replace(/"/g, '');
                                    filtered.push(filt);
                                    csvAry[k] = csvAry[k].replace(matches[m], filtered[m]);
                                }
                            }
                            var csvRowFiltered = csvAry[k];
                        } else {
                            var csvRowFiltered = csvAry[k];
                        }

                        var csvRow = csvRowFiltered.split(delim);
                        var cRw = [];

                        var csvRowLen = csvRow.length;
                        for (var l = 0; l < csvRowLen; l++) {
                            if (csvRow[l].indexOf('[{c}]') != -1) {
                                csvRow[l] = csvRow[l].replace(/\[{c}\]/g, ',');
                            }
                            if (fields) {
                                cRw.push(csvFields[l] + ' : "' + csvRow[l] + '"');
                            } else {
                                cRw.push('"' + csvRow[l] + '"');
                            }
                        }

                        if (fields) {
                            csvRows.push('{' + cRw.join(', ') + '}');
                        } else {
                            csvRows.push('[' + cRw.join(', ') + ']');
                        }
                    }
                }

                if (fields) {
                    csvObj += '[' + csvRows.join(', ') + ']';
                } else {
                    csvObj += '[' + csvRows.join(', ') + ']';
                }

                eval(csvObj);
                obj = csv;
                break;

            // Else just return plain text response
            default:
                obj = response.text;
        }

        if (trace != null) {
            trace.apply(undefined, [response]);
        }
        return obj;
    };

    /** Function to process a response */
    window.jax.http.processResponse = function(index) {
        window.jax.http.responses[index] = {};

        if (window.jax.http.requests[index] != undefined) {
            window.jax.http.responses[index] = {
                headers    : {},
                url        : '',
                status     : 0,
                statusText : '',
                timeout    : 0,
                body       : '',
                text       : '',
                xml        : ''
            };
            var h = window.jax.http.requests[index].getAllResponseHeaders();
            if ((h != null) && (h != '')) {
                h = h.split("\n");
                for (var i = 0; i < h.length; i++) {
                    var head = h[i].substring(0, h[i].indexOf(':')).trim();
                    var val  = h[i].substring(h[i].indexOf(':') + 1).trim();
                    if (head != '') {
                        window.jax.http.responses[index].headers[head] = val;
                    }
                }
            }
            window.jax.http.responses[index].url        = (typeof window.jax.http.requests[index].responseURL != 'undefined')  ? window.jax.http.requests[index].responseURL : '';
            window.jax.http.responses[index].status     = window.jax.http.requests[index].status;
            window.jax.http.responses[index].statusText = window.jax.http.requests[index].statusText;
            window.jax.http.responses[index].timeout    = window.jax.http.requests[index].timeout;
            window.jax.http.responses[index].body       = (typeof window.jax.http.requests[index].response != 'undefined')     ? window.jax.http.requests[index].response : '';
            window.jax.http.responses[index].text       = (typeof window.jax.http.requests[index].responseText != 'undefined') ? window.jax.http.requests[index].responseText : '';
            window.jax.http.responses[index].xml        = (typeof window.jax.http.requests[index].responseXML != 'undefined')  ? window.jax.http.requests[index].responseXML : '';
        }

        window.jax.http.response = window.jax.http.responses[index];
        return window.jax.http.response;
    };
})(window);

/**
 * http/response.js
 */
(function(window){
    /** Function to build a query */
    window.jax.http.buildQuery = function(data) {
        if (data.constructor != FormData) {
            var query    = '';
            var values   = '';
            var chkCount = [];

            // Loop through the elements to assemble the query string.
            // If it's a form element object
            if (data.elements != undefined) {
                for (var i = 0; i < data.elements.length; i++) {
                    if (data.elements[i].value != undefined) {
                        var name = (data.elements[i].name.indexOf('[') != -1) ?
                            data.elements[i].name.substring(0, data.elements[i].name.indexOf('[')) : data.elements[i].name;

                        // If the element is a checkbox or radio element that's checked
                        if ((data.elements[i].type == 'checkbox') || (data.elements[i].type == 'radio')) {
                            if (data.elements[i].checked) {
                                if (chkCount[name] != undefined) {
                                    chkCount[name]++;
                                } else {
                                    chkCount[name] = 0;
                                }
                                if (i != 0) {
                                    query += '&';
                                }
                                if (data.elements[i].type == 'checkbox') {
                                    query += encodeURIComponent(name + '[' + chkCount[name] + ']') + '=' +
                                        encodeURIComponent(data.elements[i].value);
                                } else {
                                    query += encodeURIComponent(name) + '=' + encodeURIComponent(data.elements[i].value);
                                }
                            }
                            // Else, if the element is a multiple select element
                        } else if ((data.elements[i].type.indexOf('select') != -1) && (data.elements[i].multiple)) {
                            for (var j = 0; j < data.elements[i].options.length; j++) {
                                if (data.elements[i].options[j].selected) {
                                    if (chkCount[name] != undefined) {
                                        chkCount[name]++;
                                    } else {
                                        chkCount[name] = 0;
                                    }
                                    if (i != 0) {
                                        query += '&';
                                    }
                                    query += encodeURIComponent(name + '[' + chkCount[name] + ']') + '=' +
                                        encodeURIComponent(data.elements[i].options[j].value);
                                }
                            }
                            // Else a normal element
                        } else {
                            if (i != 0) {
                                query += '&';
                            }
                            query += encodeURIComponent(name) + '=' + encodeURIComponent(data.elements[i].value);
                        }
                    }
                }
            // If it's an object
            } else if (data.constructor == Object) {
                var i = 0;
                for (var name in data) {
                    if (i != 0) {
                        query += '&';
                    }
                    if (data[name].constructor == Array) {
                        values = '';
                        for (var j = 0; j < data[name].length; j++) {
                            if (j != 0) {
                                values += '&';
                            }
                            values += encodeURIComponent(name + '[' + j + ']') + '=' + encodeURIComponent(data[name][j]);
                        }
                        query += values;
                    } else {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(data[name]);
                    }
                    i++;
                }
            // If it's a basic array with a set of arrays with name/value pairs
            } else if (data.constructor == Array) {
                for (var i = 0; i < data.length; i++) {
                    if (i != 0) {
                        query += '&';
                    }
                    if (data[i][1].constructor == Array) {
                        values = '';
                        for (var j = 0; j < data[i][1].length; j++) {
                            if (j != 0) {
                                values += '&';
                            }
                            values += encodeURIComponent(data[i][0] + '[' + j + ']') + '=' + encodeURIComponent(data[i][1][j]);
                        }
                        query += values;
                    } else {
                        query += encodeURIComponent(data[i][0]) + '=' + encodeURIComponent(data[i][1]);
                    }
                }
            }
        } else {
            query = data;
        }

        return query;
    };
})(window);

/**
 * browser.js
 */
(function(window){
    /** Initial browser object and detection */
    var browser = {
        ua      : navigator.userAgent,
        os      : null,  name    : null,  version : null,
        webkit  : false, mozilla : false, msie    : false,
        chrome  : false, safari  : false, opera   : false,

        // Define mobile browser properties
        mobile     : false, tablet     : false,
        android    : false, apple      : false, windows    : false,
        blackberry : false, pre        : false, device     : null,
        geo        : false,

        /** Function to open a browser window */
        open : function(url, name, opts) {
            if (url == undefined) {
                throw "You must pass a url value.";
            }
            if (name == undefined) {
                name = 'jax-window';
            }
            if (opts == undefined) {
                opts = {};
            }
            var wid  = (opts.width != undefined)    ? opts.width    : 640;
            var hgt  = (opts.height != undefined)   ? opts.height   : 480;
            var scr  = (opts.scroll != undefined)   ? opts.scroll   : 'no';
            var res  = (opts.resize != undefined)   ? opts.resize   : 'no';
            var stat = (opts.status != undefined)   ? opts.status   : 'no';
            var loc  = (opts.location != undefined) ? opts.location : 'no';
            var mnu  = (opts.menu != undefined)     ? opts.menu     : 'no';
            var tool = (opts.tool != undefined)     ? opts.tool     : 'no';
            var x    = (opts.x != undefined)        ? opts.x        : (screen.width / 2) - (wid / 2);
            var y    = (opts.y != undefined)        ? opts.y        : (screen.height / 2) - (hgt / 2);

            var windowOpts = 'width=' + wid + ',height=' + hgt + ',scrollbars=' + scr + ',resizable=' + res +
                ',status=' + stat + ',location=' + loc + ',menubar=' + mnu + ',toolbar=' + tool +
                ',left=' + x + ',top=' + y;
            window.open(url, name, windowOpts);
        },

        /** Function to route browser to a specific device */
        route : function(options) {
            if (options == undefined) {
                throw 'The route options were not defined.';
            }

            if (options.desktop == undefined) {
                options.desktop = location.href;
            }

            // Route based on force property
            if (options.force != undefined) {
                if ((options.force.toLowerCase() == this.device) && (options[this.device] != undefined) &&
                    (location.href.indexOf(options[this.device]) == -1)) {
                    window.location = options[this.device];
                } else if ((options.force.toLowerCase() == 'desktop') && (options.desktop != undefined) &&
                    (location.href.indexOf(options.desktop) == -1)) {
                    window.location = options.desktop;
                } else if ((options.force.toLowerCase() == 'tablet') && (options.tablet != undefined) &&
                    (location.href.indexOf(tablet) == -1)) {
                    window.location = options.tablet;
                } else if ((options.force.toLowerCase() == 'mobile') && (options.mobile != undefined) &&
                    (location.href.indexOf(mobile) == -1)) {
                    window.location = options.mobile;
                }
            // Else, just route normally
            } else {
                if ((this.device != null) && (options[this.device] != undefined) && (location.href.indexOf(options[this.device]) == -1)) {
                    window.location = options[this.device];
                } else if ((this.tablet) && (options.tablet != undefined) && (location.href.indexOf(options.tablet) == -1)) {
                    window.location = options.tablet;
                } else if ((this.mobile) && (options.mobile != undefined) && (location.href.indexOf(options.mobile) == -1)) {
                    window.location = options.mobile;
                }
            }
        }
    };

    /** Calculate browser properties */
    var os  = browser.ua.toLowerCase().match(/(windows|macintosh|linux|freebsd|openbsd|netbsd|sunos)/i);
    var brw = browser.ua.toLowerCase().match(/(chrome|firefox|msie|trident|konqueror|navigator|opera|safari)/i);
    var dev = browser.ua.toLowerCase().match(/(android|blackberry|windows ce|windows phone|opera mini|pre|presto|ipod|iphone|ipad|nokia|symbian|palm|treo|hiptop|avantgo|plucker|xiino|blazer|elaine|teleca|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|pda|psp)/i);

    /** Get platform OS */
    if ((os != null) && (os[0] != undefined)) {
        browser.os = os[0].charAt(0).toUpperCase() + os[0].substring(1).replace('bsd', 'BSD').replace('os', 'OS');
    }

    /** Get browser name */
    if ((brw != null) && (brw[0] != undefined)) {
        if ((brw[0] == 'msie') || (brw[0] == 'trident')) {
            browser.name = 'MSIE';
        } else {
            browser.name = brw[0].charAt(0).toUpperCase() + brw[0].substring(1);
        }
    }

    /** Is it webkit */
    browser.webkit = (browser.ua.toLowerCase().indexOf('webkit') != -1) ;

    /** Has geolocation */
    browser.geo = (navigator.geolocation) ? navigator.geolocation : false;

    /** Get browser and version */
    switch (browser.name) {
        case 'Chrome':
            browser.chrome = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Chrome/') + 7);
            browser.version = browser.version.substring(0, browser.version.indexOf(' '));
            break;
        case 'Firefox':
            browser.mozilla = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Firefox/') + 8);
            break;
        case 'MSIE':
            browser.msie = true;
            if (browser.ua.indexOf('MSIE ') != -1) {
                browser.version = browser.ua.substring(browser.ua.indexOf('MSIE ') + 5);
                browser.version = browser.version.substring(0, browser.version.indexOf(';'));
            } else {
                browser.version = browser.ua.substring(browser.ua.indexOf('rv:') + 3);
                browser.version = browser.version.substring(0, browser.version.indexOf(')'));
            }
            break;
        case 'Konqueror':
            browser.version = browser.ua.substring(browser.ua.indexOf('Konqueror/') + 10);
            browser.version = browser.version.substring(0, browser.version.indexOf(';'));
            break;
        case 'Navigator':
            browser.mozilla = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Navigator/') + 10);
            break;
        case 'Opera':
            browser.opera = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Opera/') + 6);
            browser.version = browser.version.substring(0, browser.version.indexOf(' '));
            break;
        case 'Safari':
            browser.safari = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Version/') + 8);
            browser.version = browser.version.substring(0, browser.version.indexOf(' '));
            break;
    }

    /** If mobile, get device */
    if ((dev != null) && (dev[0] != undefined)) {
        browser.device = dev[0];
        browser.mobile = true;
        browser.tablet = (browser.device == 'ipad') ? true : !(browser.ua.indexOf('Mobile') != -1);

        switch (browser.device) {
            case 'android':
                browser.android = true;
                break;
            case 'blackberry':
                browser.blackberry = true;
                break;
            case 'ipod':
            case 'ipad':
            case 'iphone':
                browser.apple = true;
                break;
            case 'windows ce':
            case 'windows phone':
                browser.windows = true;
                break;
            case 'pre':
            case 'presto':
                browser.pre = true;
                break;
        }
    }

    window.jax.browser = browser;
})(window);

/**
 * cookie.js
 */
(function(window){
    window.jax.cookie = {
        /** Function to save a cookie */
        save : function(name, value, options) {
            if (typeof value != 'string') {
                if (typeof value == 'number') {
                    value = value.toString();
                } else {
                    value = JSON.stringify(value);
                }
            }
            var cookie = name + '=' + encodeURI(value);

            // Parse options
            if (options != undefined) {
                cookie += (options.domain != undefined) ? ';domain=' + options.domain : '';
                cookie += (options.path != undefined) ? ';path=' + options.path : '';
                if (options.expire != undefined) {
                    var expdate = new Date();
                    expdate.setDate(expdate.getDate() + options.expire);
                    cookie += ';expires=' + expdate.toGMTString();
                }
            }

            // Set the cookie.
            document.cookie = cookie;

            return this;
        },

        /** Function to load a cookie value */
        load : function(name) {
            var value = '';

            // If the cookie is set, parse the value.
            if (document.cookie.length > 0) {
                if (name == null) {
                    value = {};
                    var ary = document.cookie.split(';');
                    for (var i = 0; i < ary.length; i++) {
                        var a = ary[i].trim().split('=');
                        var n = a[0];
                        var v = decodeURI(a[1]);
                        if ((v.indexOf('{') != -1) || (v.indexOf('[') != -1)) {
                            v = JSON.parse(decodeURIComponent(v));
                        }
                        value[n] = v;
                    }
                } else {
                    var start = document.cookie.indexOf(name + '=');

                    if (start != -1) {
                        start = start + name.length + 1;
                        var end = document.cookie.indexOf(';', start);
                        if (end == -1) {
                            end = document.cookie.length;
                        }

                        value = decodeURI(document.cookie.substring(start, end));
                        if ((value.indexOf('{') != -1) || (value.indexOf('[') != -1)) {
                            value = JSON.parse(decodeURIComponent(value));
                        }
                    }
                }
            }

            return value;
        },

        /** Function to remove a cookie or all cookies */
        remove : function(name) {
            if (name == null) {
                var c = this.load();
                for (var n in c) {
                    this.save(n, '', {"expire" : -1});
                }
            } else {
                this.save(name, '', {"expire" : -1});
            }

            return this
        }
    };
})(window);

/**
 * json.js
 */
(function(window){
    window.jax.json = {
        /** Function to parse either JSON string or a file that contains a JSON string */
        parse : function(json) {
            var obj;
            if (json.indexOf('{') != -1) {
                try {
                    obj = JSON.parse(decodeURIComponent(json));
                } catch (e) {
                    obj = JSON.parse(json);
                }
            } else {
                obj = window.jax.ajax(json);
            }
            return obj;
        },

        /** Function to turn an object into a JSON string */
        toString : function(obj) {
            return JSON.stringify(obj);
        }
    };
})(window);
/**
 * storage.js
 */
(function(window){
    window.jax.storage = {
        length : 0,

        /** Function to save a value to local storage */
        save   : function(name, value) {
            if (typeof value != 'string') {
                if (typeof value == 'number') {
                    value = value.toString();
                } else {
                    value = JSON.stringify(value);
                }
            }
            window.localStorage[name] = value;
            this.length = window.localStorage.length;
            return this;
        },

        /** Function to get a value from local storage */
        load : function(name) {
            if (name == null) {
                var value = {};
                for (var n in window.localStorage) {
                    var v = window.localStorage[n];
                    if ((v.indexOf('{') != -1) || (v.indexOf('[') != -1)) {
                        v = JSON.parse(decodeURIComponent(v));
                    }
                    value[n] = v;
                }
            } else {
                if (window.localStorage[name] != undefined) {
                    var value = window.localStorage[name];
                    if ((value.indexOf('{') != -1) || (value.indexOf('[') != -1)) {
                        value = JSON.parse(decodeURIComponent(value));
                    }
                } else {
                    var value = null;
                }
            }

            return value;
        },

        /** Function to remove a value or all values from local storage */
        remove : function(name) {
            if (name == null) {
                window.localStorage.clear();
            } else {
                window.localStorage.removeItem(name);
            }
            this.length = window.localStorage.length;
            return this;
        }
    };
})(window);
