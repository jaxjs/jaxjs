/**
 * jax javascript library (http://www.jaxjs.org/)
 *
 * @link       https://github.com/jaxjs/jaxjs
 * @category   jax
 * @author     Nick Sagona, III <dev@nolainteractive.com>
 * @copyright  Copyright (c) 2009-2016 NOLA Interactive, LLC. (http://www.nolainteractive.com)
 * @license    http://www.jaxjs.org/license     New BSD License
 * @version    5.0.0
 * @build      Jul 17, 2016 17:41:41
 */
(function(window){
    window.jax = {
        version : '5.0.0'  
    };
})(window);

/**
 * core/query.js
 */
(function(window){
    /**
     * Function to get a variable or variables from the query string
     *
     * @param   {String} key
     * @param   {String} u
     * @returns {Mixed}
     */
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

    /**
     * Function to build a query
     *
     * @param   {Mixed} data
     * @returns {String}
     */
    window.jax.buildQuery = function(data) {
        if (data.constructor != FormData) {
            var query = '';
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
                        var aryVals = '';
                        for (var j = 0; j < data[name].length; j++) {
                            if (j != 0) {
                                aryVals += '&';
                            }
                            aryVals += encodeURIComponent(name + '[' + j + ']') + '=' + encodeURIComponent(data[name][j]);
                        }
                        query += aryVals;
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
                        var aryVals = '';
                        for (var j = 0; j < data[i][1].length; j++) {
                            if (j != 0) {
                                aryVals += '&';
                            }
                            aryVals += encodeURIComponent(data[i][0] + '[' + j + ']') + '=' + encodeURIComponent(data[i][1][j]);
                        }
                        query += aryVals;
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
    
    /** Function to import variables passed into JS files via a query-string */
    window.jax.importVars = function() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src != undefined) {
                if (scripts[i].src.indexOf('.js?') != -1) {
                    var vars = scripts[i].src.substring(scripts[i].src.indexOf('.js?') + 4);
                    var varsAry = vars.split('&');
                    for (var j = 0; j < varsAry.length; j++) {
                        if (varsAry[j].indexOf('=') != -1) {
                            eval('window.' + varsAry[j].replace('=', ' = "') + '"');
                        }
                    }
                }
            }
        }
    };

    /**
     * Function to the target identifier of the document's URI
     *
     * @param   {String} u
     * @returns {String}
     */
    window.jax.target = function(u) {
        var url = (u != null) ? u : location.href;
        var target = null;
        if (url.indexOf('#') != -1) {
            target = url.substring(url.indexOf('#') + 1);
        }
        return target;
    };
})(window);

/**
 * core/random.js
 */
(function(window){
    /**
     * Function to generate a random number between two numbers
     *
     * @param   {Number} num1
     * @param   {Number} num2
     * @returns {Number}
     */
    window.jax.rand   = null;
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
})(window);

/**
 * ajax.js
 */
(function(window){
    window.jax.requests = [];

    /**
     * Function to perform AJAX requests
     *
     * @param   {String} url
     * @param   {Object} opts
     * @returns {Mixed}
     */
    window.jax.ajax = function(url, opts) {
        // Create a new request object.
        var index = window.jax.random(100000, 999999);
        window.jax.requests[index] = (window.XMLHttpRequest) ? new XMLHttpRequest() : false;

        // Get options
        var method  = ((opts != undefined) && (opts.method != undefined))  ? opts.method.toLowerCase() : 'get';
        var async   = ((opts != undefined) && (opts.async != undefined))   ? opts.async : false;
        var fields  = ((opts != undefined) && (opts.fields != undefined))  ? opts.fields : true;
        var data    = ((opts != undefined) && (opts.data != undefined))    ? window.jax.buildQuery(opts.data) : null;
        var type    = ((opts != undefined) && (opts.type != undefined))    ? opts.type : null;
        var delim   = ((opts != undefined) && (opts.delim != undefined))   ? opts.delim : null;
        var headers = ((opts != undefined) && (opts.headers != undefined)) ? opts.headers : null;
        var status  = ((opts != undefined) && (opts.status != undefined))  ? opts.status : null;
        var trace   = ((opts != undefined) && (opts.trace != undefined))   ? opts.trace : null;

        // If method is GET
        if (method == 'get') {
            if (data != null) {
                url += '?' + data;
            }
            window.jax.requests[index].open('GET', url, async);
            // Else, if method is POST
        } else if (method == 'post') {
            // Set and send the request, setting the function to execute on the return of a response.
            window.jax.requests[index].open('POST', url, async);
            if (data != null) {
                if (data.constructor != FormData) {
                    window.jax.requests[index].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    if (data.length != undefined) {
                        window.jax.requests[index].setRequestHeader('Content-Length', data.length.toString());
                    }
                    window.jax.requests[index].setRequestHeader('Connection', 'close');
                }
            }
        }

        // If additional headers are set, send them
        if (headers != null) {
            for (var header in headers) {
                window.jax.requests[index].setRequestHeader(header, headers[header]);
            }
        }

        // If status function handlers have been set, the set the onreadystatechange
        if (status != null) {
            window.jax.requests[index].onreadystatechange = function() {
                if (window.jax.requests[index].readyState == 4) {
                    var response = window.jax.getResponse(index);
                    // If they exist, execute normal status return function handlers

                    if (status[window.jax.requests[index].status]) {
                        if (typeof status[window.jax.requests[index].status] == 'function') {
                            status[window.jax.requests[index].status](response);
                        } else if (status[window.jax.requests[index].status].constructor == Array) {
                            for (var i = 0; i < status[window.jax.requests[index].status].length; i++) {
                                if (typeof status[window.jax.requests[index].status][i] == 'function') {
                                    status[window.jax.requests[index].status][i](response);
                                }
                            }
                        }
                        // Else, if generic error handler(s) exist, execute error handler(s)
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
                    if (trace != null) {
                        trace.apply(undefined, [response]);
                    }
                }
            };

            window.jax.requests[index].send(data);
            return this;
            // Else, rely on the built in response parser
        } else {
            window.jax.requests[index].send(data);
            return window.jax.parseResponse(window.jax.getResponse(index), fields, type, delim, async, trace);
        }
    };
})(window);

/**
 * ajax/response.js
 */
(function(window){
    /**
     * Function to parse a response
     *
     * @param   {Object}   response
     * @param   {Boolean}  fields
     * @param   {String}   type
     * @param   {String}   delim
     * @param   {Boolean}  async
     * @param   {Function} trace
     * @returns {Object}
     */
    window.jax.parseResponse = function(response, fields, type, delim, async, trace) {
        var obj;

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
                    if (delim == null) {
                        delim = ',';
                    }
                } else if (response.headers['Content-Type'].toLowerCase().indexOf('tsv') != -1) {
                    type = 'csv';
                    if (delim == null) {
                        delim = "\t";
                    }
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
                        if (delim == null) {
                            delim = ',';
                        }
                    } else if (validTsv.test(response)) {
                        type = 'csv';
                        if (delim == null) {
                            delim = "\t";
                        }
                    }
                }
            }
        }

        if (type == null) {
            throw 'Error: The content type was either not passed or could not be auto-detected.';
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
                if (delim == null) {
                    throw 'Error: The content delimiter was either not passed or could not be auto-detected.';
                }
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

    /**
     * Function to get a response
     *
     * @param   {Number} index
     * @returns {Object}
     */
    window.jax.getResponse = function(index) {
        var response = {};

        if (window.jax.requests[index] != undefined) {
            var response = {
                request    : window.jax.requests[index],
                headers    : {},
                status     : 0,
                statusText : '',
                body       : '',
                text       : '',
                xml        : ''
            };
            var h = window.jax.requests[index].getAllResponseHeaders();
            if ((h != null) && (h != '')) {
                h = h.split("\n");
                for (var i = 0; i < h.length; i++) {
                    var head = h[i].substring(0, h[i].indexOf(':')).trim();
                    var val  = h[i].substring(h[i].indexOf(':') + 1).trim();
                    if (head != '') {
                        response.headers[head] = val;
                    }
                }
            }
            response.status     = window.jax.requests[index].status;
            response.statusText = window.jax.requests[index].statusText;
            response.body       = (typeof window.jax.requests[index].response != 'undefined')     ? window.jax.requests[index].response : '';
            response.text       = (typeof window.jax.requests[index].responseText != 'undefined') ? window.jax.requests[index].responseText : '';
            response.xml        = (typeof window.jax.requests[index].responseXML != 'undefined')  ? window.jax.requests[index].responseXML : '';
        }

        return response;
    };
})(window);

/**
 * ajax/get.js
 */
(function(window){
    /**
     * Alias function to perform a POST AJAX request
     *
     * @param   {String} url
     * @param   {Object} opts
     * @returns {Mixed}
     */
    window.jax.post = function(url, opts) {
        if (opts == undefined) {
            opts = {method : 'post'};
        } else if ((opts.method == undefined) || ((opts.method != undefined) && (opts.method.toLowerCase() != 'post'))) {
            opts.method = 'post';
        }
        return window.jax.ajax(url, opts);
    };
})(window);
/**
 * ajax/http.js
 */
(function(window){
    window.jax.http = {
        /**
         * Function to get the HTTP request status of a URL
         *
         * @param   {String} url
         * @returns {Number}
         */
        getStatus : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status;
        },
        /**
         * Function to determine if the HTTP request is successful
         *
         * @param   {String} url
         * @returns {boolean}
         */
        isSuccess : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return ((type == 3) || (type == 2) || (type == 1));
        },
        /**
         * Function to determine if the HTTP request is a redirect
         *
         * @param   {String} url
         * @returns {boolean}
         */
        isRedirect : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return (type == 3);
        },
        /**
         * Function to determine if the HTTP request is an error
         *
         * @param   {String} url
         * @returns {boolean}
         */
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
 * ajax/get.js
 */
(function(window){
    /**
     * Alias function to perform a GET AJAX request
     *
     * @param   {String} url
     * @param   {Object} opts
     * @returns {Mixed}
     */
    window.jax.get = function(url, opts) {
        if (opts == undefined) {
            opts = {method : 'get'};
        } else if ((opts.method == undefined) || ((opts.method != undefined) && (opts.method.toLowerCase() != 'get'))) {
            opts.method = 'get';
        }
        return window.jax.ajax(url, opts);
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
        /**
         * Function to open a browser window
         *
         * @param {String} url
         * @param {String} name
         * @param {Object} opts
         */
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
        /**
         * Function to route browser to a specific device
         *
         * @param {Object} options
         */
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
        /**
         * Function to save a cookie
         *
         * @param   {String} name
         * @param   {String} value
         * @param   {Object} options
         * @returns {Object}
         */
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
        /**
         * Function to load a cookie value
         *
         * @param   {String} name
         * @returns {Mixed}
         */
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
        /**
         * Function to remove a cookie or all cookies
         *
         * @param   {String} name
         * @returns {Object}
         */
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
        /**
         * Function to parse either JSON string or a file that contains a JSON string
         *
         * @param   {String} json
         * @returns {Object}
         */
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
        /**
         * Function to turn an object into a JSON string
         *
         * @param   {Object} obj
         * @returns {String}
         */
        toString : function(obj) {
            return JSON.stringify(obj);
        }
    };
})(window);
/**
 * load/beforeunload.js
 */
(function(window){
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
 * storage.js
 */
(function(window){
    window.jax.storage = {
        length : 0,
        /**
         * Function to save a value to local storage
         *
         * @param   {String} name
         * @param   {Mixed}  value
         * @returns {Object}
         */
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
        /**
         * Function to get a value from local storage
         *
         * @param   {String} name
         * @returns {Mixed}
         */
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
        /**
         * Function to remove a value or all values from local storage
         *
         * @param   {String} name
         * @returns {Object}
         */
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
/**
 * string.js
 */
(function(window){
    /** Copy and extend the native String class to the main jax object */
    window.jax.String = String;
})(window);

/**
 * string/case.js
 */
(function(window){
    /**
     * Function to convert string from under_score or hyphenated to camelCase.
     *
     * @returns {String}
     */
    window.jax.String.prototype.toCamelcase = function() {
        var str = this;
        var delim = (str.indexOf('_') != -1) ? '_' : '-';

        var strAry = str.split(delim);
        var camelCase = '';
        for (var i = 0; i < strAry.length; i++) {
            if (i == 0) {
                camelCase += strAry[i];
            } else {
                camelCase += strAry[i].substring(0, 1).toUpperCase() + strAry[i].substring(1);
            }
        }

        return camelCase;
    };

    /**
     * Function to convert string from hyphenated or camelCase to under_score.
     *
     * @returns {String}
     */
    window.jax.String.prototype.toUnderscore = function() {
        var str = this;
        var under_score = '';

        if (str.indexOf('-') != -1) {
            under_score = str.replace('-', '_').toLowerCase();
        } else {
            for (var i = 0; i < str.length; i++) {
                if (i == 0) {
                    under_score += str[i].toLowerCase();
                } else {
                    if (str[i] == str[i].toUpperCase()) {
                        under_score += ('_' + str[i].toLowerCase());
                    } else {
                        under_score += str[i].toLowerCase();
                    }
                }
            }
        }

        return under_score;
    };

    /**
     * Function to convert string from under_score or camelCase to hyphenated.
     *
     * @returns {String}
     */
    window.jax.String.prototype.toHyphen = function() {
        var str = this;
        var hyphen = '';

        if (str.indexOf('_') != -1) {
            hyphen = str.replace('_', '-').toLowerCase();
        } else {
            for (var i = 0; i < str.length; i++) {
                if (i == 0) {
                    hyphen += str[i].toLowerCase();
                } else {
                    if (str[i] == str[i].toUpperCase()) {
                        hyphen += ('-' + str[i].toLowerCase());
                    } else {
                        hyphen += str[i].toLowerCase();
                    }
                }
            }
        }

        return hyphen;
    };
})(window);

/**
 * string/clean.js
 */
(function(window){
    /**
     * Function to clean any common MS Word-based characters.
     *
     * @param   {Boolean} html
     * @returns {String}
     */
    window.jax.String.prototype.clean = function(html) {
        if (html != null) {
            var apos = "&#39;";
            var quot = "&#34;";
            var dash = "&#150;";
        } else {
            var apos = "'";
            var quot = '"';
            var dash = "-";
        }

        var str = this;
        str = str.replace(new RegExp(String.fromCharCode(8217), 'g'), apos);
        str = str.replace(new RegExp(String.fromCharCode(8220), 'g'), quot);
        str = str.replace(new RegExp(String.fromCharCode(8221), 'g'), quot);
        str = str.replace(new RegExp(String.fromCharCode(8211), 'g'), dash);
        str = str.replace(new RegExp(String.fromCharCode(45), 'g'), dash);
        str = str.replace(new RegExp(String.fromCharCode(8230), 'g'), "...");

        return str;
    };
})(window);

/**
 * string/trim.js
 */
(function(window){
    /** Function to trim the whitespace from the left of the string */
    window.jax.String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, '');
    };

    /** Function to trim the whitespace from the right of the string */
    window.jax.String.prototype.trimRight = function() {
        return this.replace(/\s+$/, '');
    };
})(window);
/**
 * string/random.js
 */
(function(window){
    /**
     * Function to generate random alphanumeric string of a predefined length.
     *
     * @param   {Number} len
     * @param   {Boolean} caps
     * @returns {String}
     */
    window.jax.String.random = function(len, caps) {
        // Array of alphanumeric characters. The O, 0, I, 1 and l have been removed to eliminate confusion.
        var str = '';
        var chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

        for (var i = 0; i < len; i++) {
            var num = (Math.floor(Math.random() * chars.length));
            str += (caps != null) ? chars.charAt(num).toUpperCase() : chars.charAt(num);
        }

        return str;
    };
})(window);

/**
 * string/money.js
 */
(function(window){
    /**
     * Function to convert a number to currency-formatted string
     *
     * @param   {String} cur
     * @param   {Number} dec
     * @returns {String}
     */
    window.jax.String.prototype.money = function(cur, dec) {
        var num = this;
        var decimal = '';

        if (cur == null) {
            cur = '$';
        }
        if (dec == null) {
            dec = 2;
        }

        if (num.indexOf('.') != -1) {
            var numAry = num.split('.');
            var intgr = parseInt(numAry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            if (dec > 0) {
                decimal = Number('.' + numAry[1]).toFixed(dec);
            } else {
                decimal = '';
            }
        } else {
            var intgr = parseInt(num.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            if (dec > 0) {
                decimal = '.';
                for (var i = 0; i < dec; i++) {
                    decimal += '0';
                }
            } else {
                decimal = '';
            }
        }

        decimal = parseFloat(decimal);

        return cur + new Number(intgr + decimal).toFixed(dec);
    };
})(window);

/**
 * string/html.js
 */
(function(window){
    /**
     * Function to convert certain HTML characters to HTML entities.
     *
     * @param   {Boolean} quot
     * @param   {Boolean} strict
     * @returns {String}
     */
    window.jax.String.prototype.html = function(quot, strict) {
        var str = this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if ((quot != undefined) && (quot != null)) {
            str = str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }
        if ((strict != undefined) && (strict != null)) {
            str = str.replace(/\(/g, '&#40;').replace(/\)/g, '&#41;').replace(/\//g, '&#47;')
                     .replace(/:/g, '&#58;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
                     .replace(/\\/g, '&#92;').replace(/{/g, '&#123;').replace(/}/g, '&#125;');
        }
        return str;
    };

    /**
     * Function to convert certain HTML entities back to HTML characters.
     *
     * @param   {Boolean} quot
     * @param   {Boolean} strict
     * @returns {String}
     */
    window.jax.String.prototype.dehtml = function(quot, strict) {
        var str = this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        if (quot != undefined) {
            str = str.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        }
        if (strict != undefined) {
            str = str.replace(/&#40;/g, '(').replace(/&#41;/g, ')').replace(/&#47;/g, '/')
                .replace(/&#58;/g, ':').replace(/&#91;/g, '[').replace(/&#93;/g, ']')
                .replace(/&#92;/g, '\\').replace(/&#123;/g, '{').replace(/&#125;/g, '}');
        }
        return str;
    };

    /**
     * Function to convert any links in the string to clickable HTML links.
     *
     * @param   {Boolean} tar
     * @returns {String}
     */
    window.jax.String.prototype.links = function(tar) {
        var str     = this;
        var matches = [];
        var targ    = (tar != null) ? ' target="_blank"' : '';

        var protocolMatches = this.match(/[f|ht]+tp:\/\/[^\s]*/g);
        var linkMatches     = this.match(/\s[\w]+[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,4})/g);
        var mailMatches     = this.match(/[a-zA-Z0-9\.\-\_+%]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,4}/g);

        if (protocolMatches[0] != undefined) {
            for (var i = 0; i < protocolMatches.length; i++) {
                matches.push([protocolMatches[i], '<a href="' + protocolMatches[i].trim() + '"' + targ + '>' +
                    protocolMatches[i].trim() + '</a>']);
            }
        }

        if (linkMatches[0] != undefined) {
            for (var i = 0; i < linkMatches.length; i++) {
                var lnk = linkMatches[i].trim();
                if (lnk.substring(0, 4) == 'ftp.') {
                    lnk = 'ftp://' + lnk;
                } else if (lnk.substring(0, 4) == 'www.') {
                    lnk = 'http://' + lnk;
                } else if (lnk.substring(0, 4) != 'http') {
                    lnk = 'http://' + lnk;
                }
                matches.push([linkMatches[i], ' <a href="' + lnk + '"' + targ + '>' + linkMatches[i].trim() + '</a>']);
            }
        }

        if (mailMatches[0] != undefined) {
            for (var i = 0; i < mailMatches.length; i++) {
                matches.push([mailMatches[i], '<a href="mailto:' + mailMatches[i].trim() + '"' + targ + '>' +
                    mailMatches[i].trim() + '</a>']);
            }
        }

        if (matches[0] != undefined) {
            for (var i = 0; i < matches.length; i++) {
                str = str.replace(matches[i][0], matches[i][1]);
            }
        }

        return str;
    };
})(window);

/**
 * string/slug.js
 */
(function(window){
    /**
     * Function to convert a string to an SEO-friendly slug.
     *
     * @param   {String} sep
     * @returns {String}
     */
    window.jax.String.prototype.slug = function(sep) {
        var slg = '';
        var tmpSlg = '';
        if (this.length > 0) {
            if (sep != null) {
                var slgAry = [];
                var urlAry = this.split(sep);
                for (var i = 0; i < urlAry.length; i++) {
                    tmpSlg = urlAry[i].toLowerCase();
                    tmpSlg = tmpSlg.replace(/\&/g, 'and').replace(/([^a-zA-Z0-9 \-\/])/g, '')
                        .replace(/ /g, '-').replace(/-*-/g, '-');
                    slgAry.push(tmpSlg);
                }
                tmpSlg = slgAry.join('/');
                tmpSlg = tmpSlg.replace(/-\/-/g, '/').replace(/\/-/g, '/').replace(/-\//g, '/');
                slg += tmpSlg;
            } else {
                tmpSlg = this.toLowerCase();
                tmpSlg = tmpSlg.replace(/\&/g, 'and').replace(/([^a-zA-Z0-9 \-\/])/g, '')
                    .replace(/ /g, '-').replace(/-*-/g, '-');
                slg += tmpSlg;
                slg = slg.replace(/\/-/g, '/');
            }
            if (slg.lastIndexOf('-') == (slg.length - 1)) {
                slg = slg.substring(0, slg.lastIndexOf('-'));
            }
        }
        return slg;
    };
})(window);

/**
 * string/slashes.js
 */
(function(window){
    /**
     * Function to add slashes to a string.
     *
     * @param   {Boolean} quot
     * @returns {String}
     */
    window.jax.String.prototype.addslashes = function(quot) {
        var str = this.replace(/\\/g, '\\\\');
        if ((quot != undefined) && (quot.toLowerCase() == 'single')) {
            str = str.replace(/\'/g, "\\'");
        } else if ((quot != undefined) && (quot.toLowerCase() == 'double')) {
            str = str.replace(/\"/g, '\\"');
        } else {
            str = str.replace(/\"/g, '\\"').replace(/\'/g, "\\'");
        }
        return str;
    };

    /**
     * Function to strip slashes from a string.
     *
     * @param   {Boolean} quot
     * @returns {String}
     */
    window.jax.String.prototype.stripslashes = function(quot) {
        var str = this.replace(/\\\\/g, '\\');
        if ((quot != undefined) && (quot.toLowerCase() == 'single')) {
            str = str.replace(/\\'/g, "'");
        } else if ((quot != undefined) && (quot.toLowerCase() == 'double')) {
            str = str.replace(/\\"/g, '"');
        } else {
            str = str.replace(/\\'/g, "'").replace(/\\"/g, '"');
        }
        return str;
    };
})(window);

