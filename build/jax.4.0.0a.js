/**
 * jax javascript library (http://www.jaxjs.org/)
 *
 * @link       https://github.com/jaxjs/jaxjs4
 * @category   jax
 * @author     Nick Sagona, III <dev@nolainteractive.com>
 * @copyright  Copyright (c) 2009-2014 NOLA Interactive, LLC. (http://www.nolainteractive.com)
 * @license    http://www.jaxjs.org/license     New BSD License
 * @version    4.0.0a
 * @build      Nov 29, 2014 17:46:29
 */
(function(window){
    /**
     * Base jax constructor class
     * @constructor
     */
    var jax     = function(){};
    jax.version = '4.0.0a';

    /**
     * Method to extend the jax class prototype
     *
     * @param {Object}  prop
     * @param {Boolean} over
     */
    jax.extend = function(prop, over) {
        var override = ((over != undefined) && (over != null)) ? over : false;
        var prototype = this.prototype;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            if ((typeof prototype[name] != "undefined") && (!override)) {
                throw "You are not allowed to override '" + name + "' property in jax.";
            } else {
                prototype[name] = prop[name];
            }
        }

        jax.prototype = prototype;
        jax.prototype.constructor = jax;
    };

    /** The main jax prototype */
    jax.prototype = {
        version    : jax.version,
        selector   : null,
        length     : 0,
        view       : {
            width  : 0,
            height : 0
        },
        /**
         * Main init/constructor function of the jax class
         *
         * @param   {Mixed} selector
         * @returns jax
         */
        init : function(selector) {
            this.selector = selector;

            // Start the selection process
            if (this.selector != undefined) {
                // If selector is the window object, document object or pre-selected object
                if ((this.selector == document) || (this.selector == window) || ((this.selector.constructor != Array) &&
                    (this.selector.constructor != String))) {
                    this.push(this.selector);
                // Else, make selection
                } else {
                    try {
                        // Special case for the :button selector
                        if (this.selector.indexOf(':button') != -1) {
                            var oldSel = this.selector;
                            this.selector = this.selector.replace(':button', '[type=button]');
                            if (oldSel.substring(0, 1) == ':') {
                                this.selector = this.selector + oldSel.replace(':button', ', button');
                            } else {
                                oldSel = oldSel.replace(':button', ' button');
                                this.selector = this.selector + ', ' + oldSel;
                            }
                        }

                        // Special cases for other type selectors
                        var typeSelectors = [
                            ':checkbox', ':file', ':image', ':password',
                            ':radio', ':reset', ':submit', ':text'
                        ];

                        for (var i = 0; i < typeSelectors.length; i++) {
                            if (this.selector.indexOf(typeSelectors[i]) != -1) {
                                this.selector = this.selector.replace(typeSelectors[i], '[type=' + typeSelectors[i].substring(1) + ']');
                            }
                        }

                        // Special case for the :selected pseudo selector
                        var selected = false;
                        if (this.selector.indexOf(':selected') != -1) {
                            selected = true;
                            this.selector = this.selector.replace(':selected', '');
                        }

                        var elems = document.querySelectorAll(this.selector);
                        for (var i = 0; i < elems.length; i++) {
                            if ((!selected) || ((selected) && (elems[i].selected))) {
                                this.push(elems[i]);
                            }
                        }
                    } catch (error) {
                        console.log(error.message + ' (' + this.selector + ').');
                    }
                }
            }

            // Get the viewport dimensions
            this.view.width = window.innerWidth;
            this.view.height = window.innerHeight;

            return this;
        },
        /**
         * Basic concat() function to uphold the array-like functionality of a jax object
         *
         * @return {Array}
         */
        concat : function() {
            return Array.prototype.concat.apply(this, arguments);
        },
        /**
         * Basic push() function to uphold the array-like functionality of a jax object
         *
         * @param   {Mixed} arg
         * @returns {jax}
         */
        push : function(arg) {
            Array.prototype.push.call(this, arg);
            return this;
        },
        /**
         * Basic pop() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        pop : function() {
            Array.prototype.pop.call(this);
            return this;
        },
        /**
         * Basic reverse() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        reverse : function() {
            Array.prototype.reverse.call(this);
            return this;
        },
        /**
         * Basic shift() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        shift : function() {
            Array.prototype.shift.call(this);
            return this;
        },
        /**
         * Basic slice() function to uphold the array-like functionality of a jax object
         *
         * @returns {Array}
         */
        slice : function() {
            return Array.prototype.slice.apply(this, arguments);
        },
        /**
         * Basic splice() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        splice : function() {
            Array.prototype.splice.apply(this, arguments);
            return this;
        },
        /**
         * Basic unshift() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        unshift : function() {
            Array.prototype.unshift.apply(this, arguments);
            return this;
        },
        /** Function to empty out the selected collection array */
        clear  : function() {
            while (this.length > 0) {
                this.pop();
            }
        },
        /**
         * Function to convert the jax object into a pure array
         *
         * @returns {Array}
         */
        toArray : function() {
            var ary = []
            for (var i = 0; i < this.length; i++) {
                ary.push(this[i]);
            }
            return ary;
        }
    };

    /**
     * Main jax object for the global space
     *
     * @param   {Mixed} selector
     * @returns {jax}
     */
    window.jax = function(selector) {
        return new jax().init(selector);
    };

    window.jax.prototype = jax.prototype;
    window.jax.version   = jax.version;

    /** The "no conflict" function under the main jax object */
    window.jax.noConflict = function() {
        delete window.$;
        return window.jax;
    };

    /**
     * Function to extend the jax class prototype in the global space
     *
     * @param {Object}  prop
     * @param {boolean} over
     */
    window.jax.extend = function(prop, over) {
        var override = ((over != undefined) && (over != null)) ? over : false;
        var prototype = window.jax.prototype;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            if ((typeof prototype[name] != "undefined") && (!override)) {
                throw "You are not allowed to override '" + name + "' property in jax.";
            } else {
                prototype[name] = prop[name];
            }
        }

        window.jax.prototype = prototype;
        window.jax.prototype.constructor = window.jax;
        window.$ = window.jax;
    };

    /** Assign the $ alias object */
    window.$ = window.jax;
})(window);

/**
 * core/ready.js
 */
jax.extend({
    /**
     * Function to trigger a function when the document object (implied) is loaded & ready.
     *
     * @param {Function} func
     */
    ready : function(func) {
        document.addEventListener('DOMContentLoaded', func, false);
    }
});
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
        var query    = '';
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

        return query;
    };
})(window);

/**
 * core/target.js
 */
(function(window){
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
 * core/remove.js
 */
jax.extend({
    /**
     * Function to remove the selected element(s)
     *
     * @returns {jax}
     */
    remove : function() {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                var child = this[i] && this[i].parentNode;
                if ((child) && (this[i].parentNode != undefined)) {
                    this[i].parentNode.removeChild(this[i]);
                }
            }
        }
        return this;
    },
    /**
     * Function to remove the child contents of the selected elements
     *
     * @returns {jax}
     */
    empty : function() {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].innerHTML = '';
            }
        }
        return this;
    }
});
/**
 * core/timing.js
 */
(function(window){
    window.jax.tO = null;
    window.jax.iN = null;

    /**
     * Global delay function that uses setTimeout
     *
     * @param {Number}   ms
     * @param {Function} func
     */
    window.jax.delay = function(ms, func) {
        if ((ms == null) || (typeof ms != 'number') || (isNaN(ms))) {
            throw 'You must pass a millisecond value.'
        }
        window.jax.tO = setTimeout(func, ms);
    };

    /**
     * Global repeat function that uses setInterval
     *
     * @param {Number}   ms
     * @param {Function} func
     */
    window.jax.repeat = function(ms, func) {
        if ((ms == null) || (typeof ms != 'number') || (isNaN(ms))) {
            throw 'You must pass a millisecond value.'
        }
        window.jax.iN = setInterval(func, ms);
    };

    /** Function to clear out the global delay timeout function */
    window.jax.clearDelay = function() {
        clearTimeout(window.jax.tO);
    };

    /** Function to clear out the global repeat interval function */
    window.jax.clearRepeat = function() {
        clearInterval(window.jax.iN);
    };
})(window);
/**
 * core/misc.js
 */
(function(window){
    /** Is value defined function */
    window.jax.isDefined = function(value) {
        return typeof value != 'undefined';
    };

    /** Is value undefined function */
    window.jax.isUndefined = function(value) {
        return typeof value == 'undefined';
    };

    /** Is value not null function */
    window.jax.isNotNull = function(value) {
        return value != null;
    };

    /** Is value null function */
    window.jax.isNull = function(value) {
        return value == null;
    };

    /** Is value boolean function */
    window.jax.isBoolean = function(value) {
        return typeof value == 'boolean';
    };

    /** Is value string function */
    window.jax.isString = function(value) {
        return typeof value == 'string';
    };

    /** Is value number function */
    window.jax.isNumber = function(value) {
        return typeof value == 'number';
    };

    /** Is value array function */
    window.jax.isArray = function(value) {
        return value.constructor == Array;
    };

    /** Is value date function */
    window.jax.isDate = function(value) {
        return value.constructor == Date;
    };

    /** Is value object function */
    window.jax.isObject = function(value) {
        return value.constructor == Object;
    };

    /** Is value function function */
    window.jax.isFunction = function(value) {
        return typeof value == 'function';
    };

    /** Is value window function */
    window.jax.isWindow = function(value) {
        return ((value != undefined) && (value.document != undefined) && (value.location  != undefined));
    };

    /** Is value element function */
    window.jax.isElement = function(value) {
        return ((value != undefined) && (value.nodeName != undefined));
    };
})(window);

/**
 * core/import.js
 */
(function(window){
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
            window.jax.requests[index].setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            window.jax.requests[index].setRequestHeader('Content-Length', data.length.toString());
            window.jax.requests[index].setRequestHeader('Connection', 'close');
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
                if (response.headers['Content-Type'].toLowerCase().indexOf('json') != -1) {
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
            // Parse JSON response
            case 'json':
                obj = JSON.parse(decodeURIComponent(response.text));
                break;

            // Parse XML response
            case 'xml':
                // Get XML doc from string if doesn't exist
                if (!response.xml) {
                    var str = (response.text != undefined) ? response.text : response.toString();
                    if (ActiveXObject) {
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
                        nValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
                    if (ActiveXObject) {
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
 * append.js
 */
jax.extend({
    /**
     * Function to append an new element to the current element
     *
     * @param   {String}  type
     * @param   {Object}  attribs
     * @param   {String}  value
     * @param   {Boolean} pre
     * @returns {jax}
     */
    append : function(type, attribs, value, pre) {
        if (this[0] == undefined) {
            throw 'An object must be selected in which to append.';
        }

        // Create the child element.
        var objChild = document.createElement(type);

        // Set any element attributes.
        if ((attribs != undefined) && (attribs != null)) {
            for (var attrib in attribs) {
                objChild.setAttribute(attrib, attribs[attrib]);
            }
        }

        // If the element type is a textarea
        if (type == 'textarea') {
            if (objChild.innerText) {
                objChild.innerText = (value != null) ? value : '';
            } else {
                objChild.innerHTML = (value != null) ?
                    value.replace(/&/g, '&amp;')
                         .replace(/</g, '&lt;')
                         .replace(/>/g, '&gt;')
                         .replace(/"/g, '&quot;')
                         .replace(/'/g, '&#39;') : '';
            }
            // Else, set any value within the element.
        } else {
            if ((value != undefined) && (value != null)) {
                objChild.innerHTML = value;
            }
        }

        // Prepend or append the child element to the parent element.
        if ((pre != undefined) && (pre) && (this[0].childNodes[0] != undefined)) {
            this[0].insertBefore(objChild, this[0].childNodes[0]);
        } else {
            this[0].appendChild(objChild);
        }

        return this;
    },
    /**
     * Alias function to prepend a new element to the current element
     *
     * @param   {String} type
     * @param   {Object} attribs
     * @param   {String} value
     * @returns {jax}
     */
    prepend : function(type, attribs, value) {
        return this.append(type, attribs, value, true)
    }
});
/**
 * append/radio.js
 */
jax.extend({
    /**
     * Function to append a new set of radio elements to the current element
     *
     * @param   {Array}   values
     * @param   {Object}  attribs
     * @param   {String}  marked
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendRadio : function(values, attribs, marked, pre) {
        if (this[0] == undefined) {
            throw 'An object must be selected in which to append.';
        }

        // Set the main child element.
        var objValues = [];
        var objMarked = (marked != undefined) ? marked : null;
        var objChild = document.createElement('fieldset');
        objChild.setAttribute('class', 'radio-btn-fieldset');

        // Set the elements' values.
        if (values.constructor == Array) {
            for (var i = 0; i < values.length; i++) {
                objValues.push(values[i]);
            }
        } else {
            objValues.push(values);
        }

        // Create the child elements.
        for (var i = 0; i < objValues.length; i++) {
            var newElem = document.createElement('input');
            newElem.setAttribute('type', 'radio');
            newElem.setAttribute('class', 'radio-btn');

            // Set any element attributes.
            if ((attribs != undefined) && (attribs != null)) {
                for (var attrib in attribs) {
                    var att = ((attrib == 'id') && (i > 0)) ? attribs[attrib] + i : attribs[attrib];
                    newElem.setAttribute(attrib, att);
                }
            }

            // Set elements' values and append them to the parent element.
            var valuesAry = (objValues[i].constructor != Array) ? [objValues[i], objValues[i]] : objValues[i];
            newElem.setAttribute('value', valuesAry[0]);

            if (objMarked != null) {
                newElem.checked = (objMarked == valuesAry[1]);
            }
            objChild.appendChild(newElem);

            var spanElem = document.createElement('span');
            spanElem.setAttribute('class', 'radio-span');
            spanElem.innerHTML = valuesAry[1];

            objChild.appendChild(spanElem);
        }

        // Prepend or append the child element to the parent element.
        if ((pre != undefined) && (pre) && (this[0].childNodes[0] != undefined)) {
            this[0].insertBefore(objChild, this[0].childNodes[0]);
        } else {
            this[0].appendChild(objChild);
        }

        return this;
    },
    /**
     * Alias function to prepend a new set of radio elements to the current element
     *
     * @param   {Array}  values
     * @param   {Object} attribs
     * @param   {Mixed}  marked
     * @returns {jax}
     */
    prependRadio : function(values, attribs, marked) {
        return this.appendRadio(values, attribs, marked, true);
    }
});
/**
 * append/textarea.js
 */
jax.extend({
    /**
     * Alias function to append a new textarea element to the current element
     *
     * @param   {Object}  attribs
     * @param   {String}  value
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendTextarea : function(attribs, value, pre) {
        return this.append('textarea', attribs, value, pre);
    },
    /**
     * Alias function to prepend a new textarea element to the current element
     *
     * @param   {Object} attribs
     * @param   {String} value
     * @returns {jax}
     */
    prependTextarea : function(attribs, value) {
        return this.append('textarea', attribs, value, true);
    }
});
/**
 * append/select.js
 */
jax.extend({
    /**
     * Function to append a new select element to the current element
     *
     * @param   {Array}   values
     * @param   {Object}  attribs
     * @param   {Mixed}   marked
     * @param   {String}  optionsFile
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendSelect : function(values, attribs, marked, optionsFile, pre) {
        // Set the parent element and define the properties.
        var objChild = document.createElement('select');
        var objValues = [];
        var objMarked = (marked != undefined) ? marked : null;

        // Set any element attributes.
        if ((attribs != undefined) && (attribs != null)) {
            for (var attrib in attribs) {
                objChild.setAttribute(attrib, attribs[attrib]);
            }
        }

        // If value passed was a YEAR flag, calculate the year range and set the values
        if (values.indexOf('YEAR') != -1) {
            var years = ['----'];
            var yearAry = values.split('_');

            if ((yearAry[1] != undefined) && (yearAry[2] != undefined)) {
                if (yearAry[1] < yearAry[2]) {
                    for (var i = yearAry[1]; i <= yearAry[2]; i++) {
                        years.push(i);
                    }
                } else {
                    for (var i = yearAry[1]; i >= yearAry[2]; i--) {
                        years.push(i);
                    }
                }
            } else if (yearAry[1] != undefined) {
                var d = new Date();
                var year = d.getFullYear();
                if (year < yearAry[1]) {
                    for (var i = year; i <= yearAry[1]; i++) {
                        years.push(i);
                    }
                } else {
                    for (var i = year; i >= yearAry[1]; i--) {
                        years.push(i);
                    }
                }
            } else {
                var d = new Date();
                var year = d.getFullYear();
                for (var i = year; i <= (year + 10); i++) {
                    years.push(i);
                }
            }
            vl = years;
            // Else, set the values based of a pre-defined flag, or the an array of values passed.
        } else {
            var vl = null;
            switch (values) {
                // Months, numeric short values.
                case 'HOURS_12':
                case 'MONTHS_SHORT':
                    vl = [
                        ['--', '--'], ['01', '01'], ['02', '02'], ['03', '03'], ['04', '04'], ['05', '05'],
                        ['06', '06'], ['07', '07'], ['08', '08'], ['09', '09'], ['10', '10'], ['11', '11'],
                        ['12', '12']
                    ];
                    break;
                // Days of Month, numeric short values.
                case 'DAYS_OF_MONTH':
                    vl = [
                        ['--', '--'], ['01', '01'], ['02', '02'], ['03', '03'], ['04', '04'], ['05', '05'],
                        ['06', '06'], ['07', '07'], ['08', '08'], ['09', '09'], ['10', '10'], ['11', '11'],
                        ['12', '12'], ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'], ['17', '17'],
                        ['18', '18'], ['19', '19'], ['20', '20'], ['21', '21'], ['22', '22'], ['23', '23'],
                        ['24', '24'], ['25', '25'], ['26', '26'], ['27', '27'], ['28', '28'], ['29', '29'],
                        ['30', '30'], ['31', '31']
                    ];
                    break;
                // Hours, 24-hour values.
                case 'HOURS_24':
                    vl = [
                        ['--', '--'], ['00', '00'], ['01', '01'], ['02', '02'], ['03', '03'], ['04', '04'],
                        ['05', '05'], ['06', '06'], ['07', '07'], ['08', '08'], ['09', '09'], ['10', '10'],
                        ['11', '11'], ['12', '12'], ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'],
                        ['17', '17'], ['18', '18'], ['19', '19'], ['20', '20'], ['21', '21'], ['22', '22'],
                        ['23', '23']
                    ];
                    break;
                // Minutes, incremental by 1 minute.
                case 'MINUTES':
                    vl = [
                        ['--', '--'], ['00', '00'], ['01', '01'], ['02', '02'], ['03', '03'], ['04', '04'],
                        ['05', '05'], ['06', '06'], ['07', '07'], ['08', '08'], ['09', '09'], ['10', '10'],
                        ['11', '11'], ['12', '12'], ['13', '13'], ['14', '14'], ['15', '15'], ['16', '16'],
                        ['17', '17'], ['18', '18'], ['19', '19'], ['20', '20'], ['21', '21'], ['22', '22'],
                        ['23', '23'], ['24', '24'], ['25', '25'], ['26', '26'], ['27', '27'], ['28', '28'],
                        ['29', '29'], ['30', '30'], ['31', '31'], ['32', '32'], ['33', '33'], ['34', '34'],
                        ['35', '35'], ['36', '36'], ['37', '37'], ['38', '38'], ['39', '39'], ['40', '40'],
                        ['41', '41'], ['42', '42'], ['43', '43'], ['44', '44'], ['45', '45'], ['46', '46'],
                        ['47', '47'], ['48', '48'], ['49', '49'], ['50', '50'], ['51', '51'], ['52', '52'],
                        ['53', '53'], ['54', '54'], ['55', '55'], ['56', '56'], ['57', '57'], ['58', '58'],
                        ['59', '59']
                    ];
                    break;
                // Minutes, incremental by 5 minutes.
                case 'MINUTES_5':
                    vl = [
                        ['--', '--'], ['00', '00'], ['05', '05'], ['10', '10'], ['15', '15'], ['20', '20'],
                        ['25', '25'], ['30', '30'], ['35', '35'], ['40', '40'], ['45', '45'], ['50', '50'],
                        ['55', '55']
                    ];
                    break;
                // Minutes, incremental by 10 minutes.
                case 'MINUTES_10':
                    vl = [['--', '--'], ['00', '00'], ['10', '10'], ['20', '20'], ['30', '30'], ['40', '40'], ['50', '50']];
                    break;
                // Minutes, incremental by 15 minutes.
                case 'MINUTES_15':
                    vl = [['--', '--'], ['00', '00'], ['15', '15'], ['30', '30'], ['45', '45']];
                    break;
                default:
                    // If an array is passed, set the values to the array.
                    if (values.constructor == Array) {
                        vl = values;
                    // Else, if a string is passed, check for any option sets in the options XML file in the data folder,
                    // based on the string passed.
                    } else if (optionsFile != null) {
                        vl = window.jax.parseOptionsFile(optionsFile, values);
                    }
            }
        }

        if (vl.constructor == Array) {
            for (var i = 0; i < vl.length; i++) {
                objValues.push(vl[i]);
            }
        } else {
            objValues.push(vl);
        }

        // Create the option elements.
        for (var i = 0; i < objValues.length; i++) {
            var newOpt = document.createElement('option');
            var valuesAry = (objValues[i].constructor != Array) ? [objValues[i], objValues[i]] : objValues[i];
            newOpt.setAttribute('value', valuesAry[0]);
            if (objMarked != null) {
                if (objMarked.constructor != Array) {
                    newOpt.selected = !!((objMarked == valuesAry[1]));
                } else {
                    newOpt.selected = !!((objMarked.indexOf(valuesAry[1]) != -1));
                }
            }
            newOpt.innerHTML = valuesAry[1];
            objChild.appendChild(newOpt);
        }

        // Prepend or append the child element to the parent element.
        if ((pre != undefined) && (pre) && (this[0].childNodes[0] != undefined)) {
            this[0].insertBefore(objChild, this[0].childNodes[0]);
        } else {
            this[0].appendChild(objChild);
        }

        return this;
    },
    /**
     * Alias function to prepend a new select element to the current element
     *
     * @param   {Array}  values
     * @param   {Object} attribs
     * @param   {Mixed}  marked
     * @param   {String} optionsFile
     * @returns {jax}
     */
    prependSelect : function(values, attribs, marked, optionsFile) {
        return this.appendSelect(values, attribs, marked, optionsFile, true);
    }
});

(function(window){
    /**
     * Function to parse an options XML file
     *
     * @param   {String} file
     * @param   {Array}  values
     * @returns {Array}
     */
    window.jax.parseOptionsFile = function(file, values) {
        var xml = window.jax.ajax(file);
        var optionNames = [];
        if (xml.options.nodes != undefined) {
            for (var i = 0; i < xml.options.nodes.length; i++) {
                if ((xml.options.nodes[i] != undefined) && (xml.options.nodes[i].set.name != undefined)) {
                    optionNames.push(xml.options.nodes[i].set.name);
                }
            }
        }
        // If found, construct the values array based on the values found.
        if (optionNames.indexOf(values) != -1) {
            var vl = [];
            for (var i = 0; i < xml.options.nodes.length; i++) {
                if ((xml.options.nodes[i] != undefined) && (xml.options.nodes[i].set.name == values)) {
                    for (var j = 0; j < xml.options.nodes[i].set.nodes.length; j++) {
                        if (xml.options.nodes[i].set.nodes[j] != undefined) {
                            vl.push([xml.options.nodes[i].set.nodes[j].opt.value, xml.options.nodes[i].set.nodes[j].opt.nodeValue]);
                        }
                    }
                }
            }
            // Else, just set the values array to the original parameter passed.
        } else {
            var vl = values;
        }

        return vl;
    };
})(window);
/**
 * append/checkbox.js
 */
jax.extend({
    /**
     * Function to append a new set of checkbox elements to the current element
     *
     * @param   {Array}   values
     * @param   {Object}  attribs
     * @param   {Mixed}   marked
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendCheckbox : function(values, attribs, marked, pre) {
        if (this[0] == undefined) {
            throw 'An object must be selected in which to append.';
        }

        // Set the main child element.
        var objValues = [];
        var objMarked = [];
        var objChild = document.createElement('fieldset');
        objChild.setAttribute('class', 'check-box-fieldset');

        // Set the elements' values.
        if (values.constructor == Array) {
            for (var i = 0; i < values.length; i++) {
                objValues.push(values[i]);
            }
        } else {
            objValues.push(values);
        }

        // Set the elements that are marked/checked.
        if ((marked != undefined) && (marked != null)) {
            if (marked.constructor == Array) {
                for (var i = 0; i < marked.length; i++) {
                    objMarked.push(marked[i]);
                }
            } else {
                objMarked.push(marked);
            }
        }

        // Create the child checkbox elements.
        for (var i = 0; i < objValues.length; i++) {
            var newElem = document.createElement('input');
            newElem.setAttribute('type', 'checkbox');
            newElem.setAttribute('class', 'check-box');

            // Set any element attributes.
            if ((attribs != undefined) && (attribs != null)) {
                for (var attrib in attribs) {
                    var att = ((attrib == 'id') && (i > 0)) ? attribs[attrib] + i : attribs[attrib];
                    // Account for IE7 style property issue.
                    newElem.setAttribute(attrib, att);
                }
            }

            // Set elements' values and append them to the parent element.
            var valuesAry = (objValues[i].constructor != Array) ? [objValues[i], objValues[i]] : objValues[i];
            newElem.setAttribute('value', valuesAry[0]);
            newElem.checked = (objMarked.indexOf(valuesAry[1]) != -1);
            objChild.appendChild(newElem);

            var spanElem = document.createElement('span');
            spanElem.setAttribute('class', 'check-span');
            spanElem.innerHTML = valuesAry[1];

            objChild.appendChild(spanElem);
        }

        // Prepend or append the child element to the parent element.
        if ((pre != undefined) && (pre) && (this[0].childNodes[0] != undefined)) {
            this[0].insertBefore(objChild, this[0].childNodes[0]);
        } else {
            this[0].appendChild(objChild);
        }

        return this;
    },
    /**
     * Alias function to prepend a new set of checkbox elements to the current element
     *
     * @param   {Array}  values
     * @param   {Object} attribs
     * @param   {Mixed}  marked
     * @returns {jax}
     */
    prependCheckbox : function(values, attribs, marked) {
        return this.appendCheckbox(values, attribs, marked, true);
    }
});
/**
 * append/input.js
 */
jax.extend({
    /**
     * Alias function to append a new input element to the current element
     *
     * @param   {Object}  attribs
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendInput : function(attribs, pre) {
        return this.append('input', attribs, null, pre);
    },
    /**
     * Alias function to prepend a new input element to the current element
     *
     * @param   {Object} attribs
     * @returns {jax}
     */
    prependInput : function(attribs) {
        return this.append('input', attribs, null, true);
    }
});
/**
 * attrib.js
 */
jax.extend({
    /**
     * Function to get or set element attributes
     *
     * @param   {String} name
     * @param   {String} value
     * @returns {Mixed}
     */
    attrib : function(name, value) {
        if (this.length > 0) {
            // Set attribute(s)
            if ((name != null) && (name.constructor == Object) || (value != null)) {
                for (var i = 0; i < this.length; i++) {
                    // If multiple attributes to set
                    if (name.constructor == Object) {
                        for (var prop in name) {
                            this[i].setAttribute(prop, name[prop]);
                        }
                        // Else, set single attributes
                    } else {
                        this[i].setAttribute(name, value);
                    }
                }
                return this;
                // Get attribute(s)
            } else if (this[0] != undefined) {
                // If no name is passed, get all object attributes
                if (name == null) {
                    var atts = {};
                    for (var i = 0; i < this[0].attributes.length; i++) {
                        if ((this[0].attributes[i].nodeValue != null) &&
                            (this[0].attributes[i].nodeValue != undefined) &&
                            (this[0].attributes[i].nodeValue != '')) {
                            atts[this[0].attributes[i].nodeName] = this[0].attributes[i].nodeValue;
                        }
                    }
                    return atts;
                    // Else, just get the single attribute value
                } else {
                    return this[0].getAttribute(name);
                }
            }
        }
    },
    /**
     * Function to get or set data-* attributes of an element
     *
     * @param   {String} name
     * @param   {String} value
     * @returns {Mixed}
     */
    data : function(name, value) {
        if (this.length > 0) {
            if ((name.constructor == Object) || (value != null)) {
                for (var i = 0; i < this.length; i++) {
                    if (name.constructor == Object) {
                        for (var prop in name) {
                            this[i].setAttribute('data-' + prop, name[prop]);
                        }
                    } else {
                        this[i].setAttribute('data-' + name, value);
                    }
                }
                return this;
            } else if (this[0] != undefined) {
                return this[0].getAttribute('data-' + name);
            }
        }
    }
});
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
         * @param {Object} opts
         */
        route : function(options) {
            if (options == undefined) {
                throw 'The options were not defined.';
            } else if (options.mobile == undefined) {
                throw 'The mobile URL was not defined.';
            }
            var mobile  = options.mobile;
            var desktop = (options.desktop != undefined) ? options.desktop : location.href;

            // Route based on force property
            if (options.force != undefined) {
                if ((options.force.toLowerCase() == 'desktop') && (location.href.indexOf(desktop) == -1)) {
                    window.location = desktop;
                } else if ((options.force.toLowerCase() == 'mobile') && (location.href.indexOf(mobile) == -1)) {
                    window.location = mobile;
                }
                // Else, just route to mobile, if mobile
            } else {
                if ((this.mobile) && (location.href.indexOf(mobile) == -1)) {
                    window.location = mobile;
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
 * children/parent.js
 */
jax.extend({
    /**
     * Function to determine if there is a parent node
     *
     * @returns {Boolean}
     */
    hasParent : function() {
        return ((this[0] != undefined) && (this[0].parentNode != undefined));
    },
    /**
     * Function to get the parent element of the current element
     *
     * @returns {Mixed}
     */
    parent : function() {
        return ((this[0] != undefined) && (this[0].parentNode != undefined)) ? this[0].parentNode : undefined;
    }
});
/**
 * children/child.js
 */
jax.extend({
    childIndex : 0,
    /**
     * Function to return the child nodes of an element
     *
     * @returns {Boolean}
     */
    hasChildren : function() {
        return ((this[0] != undefined) && (this[0].hasChildNodes()));
    },
    /**
     * Function to return the child nodes of an element
     *
     * @returns {Array}
     */
    children : function() {
        return ((this[0] != undefined) && (this[0].hasChildNodes())) ? this[0].childNodes : [];
    },
    /**
     * Function to get a child element of the current element
     *
     * @returns {Mixed}
     */
    child : function(i) {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            this.childIndex = i;
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the first child node of an element
     *
     * @returns {Mixed}
     */
    first : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            this.childIndex = 0;
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the last child node of an element
     *
     * @returns {Mixed}
     */
    last : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            this.childIndex = this[0].childNodes.length - 1;
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the next child node of an element
     *
     * @returns {Mixed}
     */
    next : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            if (this.childIndex == (this[0].childNodes.length - 1)) {
                this.childIndex = 0;
            } else {
                this.childIndex++;
            }
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the previous child node of an element
     *
     * @returns {Mixed}
     */
    prev : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            if (this.childIndex == 0) {
                this.childIndex = this[0].childNodes.length - 1;
            } else {
                this.childIndex--;
            }
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    }
});
/**
 * clone.js
 */
jax.extend({
    cloned : null,
    /**
     * Function to clone an element
     *
     * @param   {Object}  attribs
     * @param   {Boolean} deep
     * @param   {Boolean} events
     * @returns {jax}
     */
    clone  : function(attribs, deep, events) {
        if (this[0] == undefined) {
            throw 'An object must be selected to clone.';
        }

        var d = (deep != undefined)   ? deep : true;
        var e = (events != undefined) ? events : false;
        var c = this[0].cloneNode(d);

        // Define the events to check for
        var evts = [
            'onblur', 'onchange', 'onclick', 'onfocus', 'onkeydown',
            'onkeyup', 'onkeypress', 'onmousedown', 'onmouseenter',
            'onmouseleave', 'onmousemove', 'onmouseover', 'onmouseout',
            'onmouseup', 'onscroll', 'onselect', 'onsubmit'
        ];

        // Function to recursively crawl through the
        // child nodes to check for and assign events
        var crawl = function(par, cloned) {
            if (par.hasChildNodes()) {
                for (var j = 0; j < par.childNodes.length; j++) {
                    for (var k = 0; k < evts.length; k++) {
                        if (par.childNodes[j][evts[k]] != undefined) {
                            cloned.childNodes[j][evts[k]] = par.childNodes[j][evts[k]];
                        }
                    }
                    if (par.childNodes[j].hasChildNodes()) {
                        crawl(par.childNodes[j], cloned.childNodes[j]);
                    }
                }
            }
        };

        // Set any element override attributes.
        if ((attribs != undefined) && (attribs != null)) {
            for (var attrib in attribs) {
                c.setAttribute(attrib, attribs[attrib]);
            }
        }

        // If the events flag is set
        if (e) {
            for (var i = 0; i < evts.length; i++) {
                if (this[0][evts[i]] != undefined) {
                    c[evts[i]] = this[0][evts[i]];
                }
            }
            // If the deep flag is set, crawl for child events
            if (d) {
                crawl(this[0], c);
            }
        }

        this.cloned = c;
        return this;
    },
    /**
     * Function to append an newly cloned element to another one
     *
     * @param   {Mixed}  selector
     * @param   {Object} cloned
     * @returns {jax}
     */
    appendTo : function(selector, cloned) {
        if ((cloned == undefined) && (this.cloned != undefined)) {
            cloned = this.cloned;
            this.cloned = null;
        } else {
            throw 'The child object to append was not defined.';
        }
        window.jax(selector)[0].appendChild(cloned);
        return this;
    },
    /**
     * Function to prepend an newly cloned element to another one
     *
     * @param   {Mixed}  selector
     * @param   {Object} cloned
     * @returns {jax}
     */
    prependTo : function(selector, cloned) {
        if ((cloned == undefined) && (this.cloned != undefined)) {
            cloned = this.cloned;
            this.cloned = null;
        } else {
            throw 'The child object to prepend was not defined.';
        }
        var obj = window.jax(selector)[0];
        if (obj.childNodes[0] != undefined) {
            obj.insertBefore(cloned, obj.childNodes[0]);
        }
        return this;
    }
});
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
 * css.js
 */
jax.extend({
    /** Function to determine whether or not current object is hidden */
    isHidden : function() {
        return (this[0] != null) ? (this[0].style.display == 'none') : -1;
    },
    /** Function to see if an element is within the view port */
    inView : function() {
        if (this[0] != undefined) {
            var wid = this.width();
            var hgt = this.height();

            if (((document.documentElement) && (document.documentElement.scrollLeft)) || (document.body.scrollLeft)) {
                var xPos = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
                var yPos = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
            } else {
                var xPos = window.scrollX;
                var yPos = window.scrollY;
            }

            return (
                ((this.view.height + yPos) > this[0].offsetTop) && ((hgt + this[0].offsetTop) > yPos) &&
                    ((this.view.width + xPos) > this[0].offsetLeft) && ((wid + this[0].offsetLeft) > xPos)
                );
        }
    },
    /**
     * Function to get or set CSS properties
     *
     * @param  {Mixed} props
     * @param  {Mixed} val
     * @return {Mixed}
     */
    css : function(props, val) {
        // Get the CSS value
        if ((props.constructor == String) && (val == null)) {
            return this.getCss(props);
            // Else, set the CSS values
        } else {
            for (var i = 0; i < this.length; i++) {
                this.setCss(this[i], props, val);
            }
            return this;
        }
    }
});
/**
 * css/dimensions.js
 */
jax.extend({
    /**
     * Function to get the height of either an object or the viewport directly.
     *
     * @param  {String|Number} hgt
     * @return {Number}
     */
    height : function(hgt) {
        if (this[0] != undefined) {
            if (hgt != null) {
                this.css('height', hgt);
            }
            var h =  parseInt(this.css('height'));
            return ((!isNaN(h)) ? h : 0);
        } else {
            return parseInt(this.view.height);
        }
    },
    /**
     * Function to get the inner height of either an object (no padding.)
     *
     * @return {Number}
     */
    innerHeight : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var h  = parseInt(this.css('height'));
        var pt = parseInt(this.css('padding-top'));
        var pb = parseInt(this.css('padding-bottom'));

        return (((!isNaN(h)) ? h : 0) -
            ((!isNaN(pt)) ? pt : 0) -
            ((!isNaN(pb)) ? pb : 0));
    },
    /**
     * Function to get the outer height of either an object (margin included.)
     *
     * @return {Number}
     */
    outerHeight : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var mt  = parseInt(this.css('margin-top'));
        var btw = parseInt(this.css('border-top-width'));
        var h   = parseInt(this.css('height'));
        var bbw = parseInt(this.css('border-bottom-width'));
        var mb  = parseInt(this.css('margin-bottom'));

        return (((!isNaN(mt)) ? mt : 0) +
            ((!isNaN(btw)) ? btw : 0) +
            ((!isNaN(h)) ? h : 0) +
            ((!isNaN(bbw)) ? bbw : 0) +
            ((!isNaN(mb)) ? mb : 0));
    },
    /**
     * Function to get the width of either an object or the viewport directly.
     *
     * @param  {String|Number} hgt
     * @return {Number}
     */
    width : function(wid) {
        if (this[0] != undefined) {
            if (wid != null) {
                this.css('width', wid);
            }
            var w =  parseInt(this.css('width'));
            return ((!isNaN(w)) ? w : 0);
        } else {
            return parseInt(this.view.width);
        }
    },
    /**
     * Function to get the inner width of either an object (no padding.)
     *
     * @return {Number}
     */
    innerWidth : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var w  = parseInt(this.css('width'));
        var pl = parseInt(this.css('padding-left'));
        var pr = parseInt(this.css('padding-right'));

        return (((!isNaN(w)) ? w : 0) -
            ((!isNaN(pl)) ? pl : 0) -
            ((!isNaN(pr)) ? pr : 0));
    },
    /**
     * Function to get the outer width of either an object (margin included.)
     *
     * @return {Number}
     */
    outerWidth : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var blw = parseInt(this.css('border-left-width'));
        var ml  = parseInt(this.css('margin-left'));
        var w   = parseInt(this.css('width'));
        var brw = parseInt(this.css('border-right-width'));
        var mr  = parseInt(this.css('margin-right'));

        return (((!isNaN(blw)) ? blw : 0) +
            ((!isNaN(ml)) ? ml : 0) +
            ((!isNaN(w)) ? w : 0) +
            ((!isNaN(brw)) ? brw : 0) +
            ((!isNaN(mr)) ? mr : 0));
    }
});
/**
 * css/set.js
 */
jax.extend({
    /**
     * Function to set the CSS properties of the object passed.
     *
     * @param {Object} obj
     * @param {Mixed}  props
     * @param {Mixed}  val
     */
    setCss : function(obj, props, val) {
        if ((props.constructor == String) && (val != null)) {
            var properties = {};
            properties[props] = val;
        } else {
            var properties = props;
        }

        for (var prop in properties) {
            switch(prop) {
                // Handle opacity
                case 'opacity':
                    obj.style.opacity = properties[prop] / 100;
                    break;
                // Handle cssFloat
                case 'float':
                    obj.style.cssFloat = properties[prop];
                    break;
                // Handle all other CSS properties.
                default:
                    // Create properly formatted property, converting a dashed property to a camelCase property if applicable.
                    if (prop.indexOf('-') != -1) {
                        var propAry = prop.split('-');
                        var prp = propAry[0].toLowerCase() + propAry[1].substring(0, 1).toUpperCase() + propAry[1].substring(1);
                    } else {
                        var prp = prop;
                    }
                    eval("obj.style." + prp + " = '" + properties[prop] + "';");
            }
        }
    }
});
/**
 * css/get.js
 */
jax.extend({
    /**
     * Function to get value of CSS property passed.
     *
     * @param  {Mixed} props
     * @return {Mixed}
     */
    getCss : function(props) {
        var sty           = null;
        var opac          = false;
        var formattedProp = null;

        if (this[0] != undefined) {
            switch(props) {
                // Handle opacity
                case 'opacity':
                    formattedProp = 'opacity';
                    opac          = true;
                    break;
                // Handle cssFloat
                case 'float':
                    formattedProp = 'cssFloat';
                    break;
                // Handle all other CSS properties.
                default:
                    // Create properly formatted property, converting a dashed property to a camelCase property if applicable.
                    if (props.indexOf('-') != -1) {
                        var propAry = props.split('-');
                        formattedProp = propAry[0].toLowerCase()
                        for (var i = 1; i < propAry.length; i++) {
                            formattedProp += propAry[i].substring(0, 1).toUpperCase() + propAry[i].substring(1);
                        }
                    } else {
                        formattedProp = props;
                    }
            }

            // Attempt to get the style if assigned via JavaScript, else attempt to get the style is computed/rendered via CSS.
            var assignedStyle = eval("this[0].style." + formattedProp + ";");
            var computedStyle = (window.getComputedStyle) ? window.getComputedStyle(this[0], null).getPropertyValue(props) :
                eval('this[0].currentStyle.' + formattedProp);
            sty = (assignedStyle != '') ? assignedStyle : computedStyle;
            if (sty == '0%') {
                sty = '0px';
            }

            if (opac) {
                sty = Math.round(sty * 100);
                if (sty.toString() == '') {
                    sty = (window.jax(this[0]).css('display') != 'none') ? 100 : 0;
                }
            }

            if ((sty == undefined) || (sty == 'auto') || ((sty.constructor == String) && (sty.indexOf('%') != -1))) {
                if (props == 'width') {
                    sty = this[0].offsetWidth;
                } else if (props == 'height') {
                    sty = this[0].offsetHeight;
                }
            }

            if ((sty != undefined) && (sty.constructor == String)) {
                var pxCount = sty.match(/px/g);
                if ((pxCount != null) && (pxCount.length <= 1)) {
                    sty = parseFloat(sty);
                }
            }

            if (props == 'width') {
                sty += this.css('padding-left');
                sty += this.css('padding-right');
            } else if (props == 'height') {
                sty += this.css('padding-top');
                sty += this.css('padding-bottom');
            }
        }

        return sty;
    }
});
/**
 * css/position.js
 */
jax.extend({
    /** Function to get the element's offset top position */
    top : function() {
        return ((this[0] != undefined) && (this[0].offsetTop != undefined)) ? this[0].offsetTop : undefined;
    },
    /** Function to get the element's offset left position */
    left : function() {
        return ((this[0] != undefined) && (this[0].offsetLeft != undefined)) ? this[0].offsetLeft : undefined;
    }
});
/**
 * each.js
 */
jax.extend({
    /**
     * Function to iterate over the collection with a function
     *
     * @param   {Function} func
     * @param   {Array}    args
     * @returns {jax}
     */
    each : function(func, args) {
        if (args != null) {
            for (var i = 0; i < this.length;) {
                if (func.apply(this[i++], args) === false) {
                    break;
                }
            }
        } else {
            for (var i = 0; i < this.length;) {
                if (func.call(this[i], i, this[i++]) === false) {
                    break;
                }
            }
        }

        return this;
    }
});

(function(window){
    /**
     * Function to iterate over an object or array of items with a function
     *
     * @param {Object}   obj
     * @param {Function} func
     * @param {Array}    args
     */
    window.jax.each = function(obj, func, args) {
        if (args != null) {
            for (var name in obj) {
                if (func.apply(obj[name], args) === false) {
                    break;
                }
            }
        } else {
            for (var name in obj) {
                if (func.call(obj[name], name, obj[name]) === false) {
                    break;
                }
            }
        }
    };
})(window);
/**
 * effects.js
 */
jax.extend({
    delayTime : 0,
    /**
     * Function to show all current elements
     *
     * @returns {jax}
     */
    show : function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = 'block';
        }
        return this;
    },
    /**
     * Function to hide all current elements
     *
     * @returns {jax}
     */
    hide : function() {
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = 'none';
        }
        return this;
    },
    /**
     * Function to toggle display of selected elements
     *
     * @param   {String} disp
     * @returns {jax}
     */
    toggle : function(disp) {
        if (disp == null) {
            disp = 'block';
        }
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = (this[i].style.display == 'none') ? disp : 'none';
        }
        return this;
    },
    /**
     * Function to set the delay time for the next animation to fire
     *
     * @param   {Number} ms
     * @returns {jax}
     */
    delay : function(ms) {
        this.delayTime = ((ms != null) && (typeof ms == 'number') && (!isNaN(ms))) ? ms : 0;
        return this;
    }
});
/**
 * effects/move.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'move'
     *
     * @param   {Mixed}  x
     * @param   {Mixed}  y
     * @param   {Object} opts
     * @returns {jax}
     */
    move : function(x, y, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['move', {"x" : x, "y" : y}], opts);}, this.delayTime);
            } else {
                this.animate(['move', {"x" : x, "y" : y}], opts);
            }
        }
        return this;
    }
});
/**
 * effects/wipe.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'wipeOff'
     *
     * @param   {Mixed}  w
     * @param   {Object} opts
     * @returns {jax}
     */
    wipeOff : function(w, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['wipeOff', {"w" : w}], opts);}, this.delayTime);
            } else {
                this.animate(['wipeOff', {"w" : w}], opts);
            }
        }
        return this;
    },
    /**
     * Alias function to animate selected elements via 'wipeUp'
     *
     * @param   {Mixed}  h
     * @param   {Object} opts
     * @returns {jax}
     */
    wipeUp : function(h, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['wipeUp', {"h" : h}], opts);}, this.delayTime);
            } else {
                this.animate(['wipeUp', {"h" : h}], opts);
            }
        }
        return this;
    }
});
/**
 * effects/color.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'blendColor'
     *
     * @param   {Mixed}  c1
     * @param   {Mixed}  c2
     * @param   {Object} opts
     * @returns {jax}
     */
    blendColor : function(c1, c2, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['blendColor', {"c1" : c1, "c2" : c2}], opts);}, this.delayTime);
            } else {
                this.animate(['blendColor', {"c1" : c1, "c2" : c2}], opts);
            }
        }
        return this;
    },
    /**
     * Alias function to animate selected elements via 'blendBgColor'
     *
     * @param   {Mixed}  c1
     * @param   {Mixed}  c2
     * @param   {Object} opts
     * @returns {jax}
     */
    blendBgColor : function(c1, c2, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['blendBgColor', {"c1" : c1, "c2" : c2}], opts);}, this.delayTime);
            } else {
                this.animate(['blendBgColor', {"c1" : c1, "c2" : c2}], opts);
            }
        }
        return this;
    }
});

(function(window){
    /** Object for manipulation and calculation of color conversions and blends */
    var color = {
        color : null,
        rgb   : null,
        hex   : null,
        /**
         * Init/constructor function for the color object
         *
         * @param   {Mixed}  color
         * @returns {Object}
         */
        init  : function(color) {
            this.color = color;
            if (this.color.indexOf('rgb') != -1) {
                this.color = this.color.substring(this.color.indexOf('(') + 1);
                this.color = this.color.substring(0, this.color.indexOf(')'));
                this.rgb   = this.color.replace(/, /g, ',').split(',');
                if (this.rgb[3] == undefined) {
                    this.rgb.push(1.0);
                }

                var rHex = parseInt(this.rgb[0]).toString(16);
                var gHex = parseInt(this.rgb[1]).toString(16);
                var bHex = parseInt(this.rgb[2]).toString(16);

                if (rHex.length == 1) {
                    rHex = '0' + rHex;
                }
                if (gHex.length == 1) {
                    gHex = '0' + gHex;
                }
                if (bHex.length == 1) {
                    bHex = '0' + bHex;
                }
                this.hex = [rHex, gHex, bHex];
            } else {
                if (this.color.substring(0, 1) == '#') {
                    this.color = this.color.substring(1);
                }
                if (this.color.length == 3) {
                    this.hex = [
                        this.color.substring(0, 1).toString() + this.color.substring(0, 1).toString(),
                        this.color.substring(1, 2).toString() + this.color.substring(1, 2).toString(),
                        this.color.substring(2).toString() + this.color.substring(2).toString()
                    ]
                } else {
                    this.hex = [this.color.substring(0, 2), this.color.substring(2, 4), this.color.substring(4)];
                }
                this.rgb = [
                    parseInt(this.hex[0], 16),
                    parseInt(this.hex[1], 16),
                    parseInt(this.hex[2], 16),
                    1.0
                ];
            }

            return this;
        },
        /**
         * Function to get the hex value as string
         *
         * @returns {String}
         */
        toHex : function() {
            return '#' + this.hex[0] + this.hex[1] + this.hex[2];
        },
        /**
         * Function to get the hex R value
         *
         * @returns {String}
         */
        hexR : function() {
            return this.hex[0];
        },
        /**
         * Function to get the hex G value
         *
         * @returns {String}
         */
        hexG : function() {
            return this.hex[1];
        },
        /**
         * Function to get the hex B value
         *
         * @returns {String}
         */
        hexB : function() {
            return this.hex[2];
        },
        /**
         * Function to get the rgb value as string
         *
         * @returns {String}
         */
        toRgb : function() {
            return 'rgb(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ')';
        },
        /**
         * Function to get the rgba value as string
         *
         * @returns {String}
         */
        toRgbA : function() {
            return 'rgba(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ', ' + this.rgb[3] + ')';
        },
        /**
         * Function to get the R value
         *
         * @returns {String}
         */
        r : function() {
            return this.rgb[0];
        },
        /**
         * Function to get the G value
         *
         * @returns {String}
         */
        g : function() {
            return this.rgb[1];
        },
        /**
         * Function to get the B value
         *
         * @returns {String}
         */
        b : function() {
            return this.rgb[2];
        },
        /**
         * Function to get the A value
         *
         * @returns {String}
         */
        a : function() {
            return this.rgb[3];
        },
        /**
         * Function to create an array of colors that represent a blend between two colors
         *
         * @param   {Mixed}    color
         * @param   {Number}   tween
         * @param   {Function} easing
         * @returns {Array}
         */
        blend : function(color, tween, easing) {
            var blend = [];
            var r1 = parseInt(this.rgb[0]);
            var g1 = parseInt(this.rgb[1]);
            var b1 = parseInt(this.rgb[2]);
            var a1 = parseFloat(this.rgb[3]);

            var color2 = window.jax.color(color);
            var r2 = parseInt(color2.rgb[0]);
            var g2 = parseInt(color2.rgb[1]);
            var b2 = parseInt(color2.rgb[2]);
            var a2 = parseFloat(color2.rgb[3]);

            if ((easing == undefined) || (easing == null) || (typeof easing != 'function')) {
                easing = window.jax.tween.linear;
            }

            // Calculate the total "distance" from point a to point b
            var rTotal = r2 - r1;
            var gTotal = g2 - g1;
            var bTotal = b2 - b1;
            var aTotal = a2 - a1;

            // Calculate the steps
            for (var i = 0; i <= tween; i++) {
                var curR = Math.round(easing(i, r1, rTotal, tween));
                var curG = Math.round(easing(i, g1, gTotal, tween));
                var curB = Math.round(easing(i, b1, bTotal, tween));
                var curA = Math.round(easing(i, a1, aTotal, tween));

                var rHex = parseInt(r2).toString(16);
                var gHex = parseInt(g2).toString(16);
                var bHex = parseInt(b2).toString(16);
                if (rHex.length == 1) {
                    rHex = '0' + rHex;
                }
                if (gHex.length == 1) {
                    gHex = '0' + gHex;
                }
                if (bHex.length == 1) {
                    bHex = '0' + bHex;
                }

                blend.push({
                    "rgb"  : 'rgb(' + curR + ', ' + curG + ', ' + curB + ')',
                    "rgba" : 'rgba(' + curR + ', ' + curG + ', ' + curB + ', ' + curA + ')',
                    "hex"  : '#' + rHex + gHex + bHex
                });
            }

            return blend;
        }
    };

    /**
     * Color object factory
     *
     * @param   {Mixed} c
     * @returns {Object}
     */
    window.jax.color = function(c) {
        return color.init(c);
    };
})(window);
/**
 * effects/resize.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'resize'
     *
     * @param   {Mixed}  w
     * @param   {Mixed}  h
     * @param   {Object} opts
     * @returns {jax}
     */
    resize : function(w, h, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['resize', {"w" : w, "h" : h}], opts);}, this.delayTime);
            } else {
                this.animate(['resize', {"w" : w, "h" : h}], opts);
            }
        }
        return this;
    }
});
/**
 * effects/fade.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'fade'
     *
     * @param   {Mixed}  o
     * @param   {Object} opts
     * @returns {jax}
     */
    fade : function(o, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['fade', {"o" : o}], opts);}, this.delayTime);
            } else {
                this.animate(['fade', {"o" : o}], opts);
            }
        }
        return this;
    }
});
/**
 * effects/scroll.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'scrollX'
     *
     * @param   {Mixed}  x
     * @param   {Object} opts
     * @returns {jax}
     */
    scrollX : function(x, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['scrollX', {"x" : x}], opts);}, this.delayTime);
            } else {
                this.animate(['scrollX', {"x" : x}], opts);
            }
        }
        return this;
    },
    /**
     * Alias function to animate selected elements via 'scrollY'
     *
     * @param   {Mixed}  y
     * @param   {Object} opts
     * @returns {jax}
     */
    scrollY : function(y, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['scrollY', {"y" : y}], opts);}, this.delayTime);
            } else {
                this.animate(['scrollY', {"y" : y}], opts);
            }
        }
        return this;
    }
});
/**
 * effects/animate.js
 */
(function(window){
    window.jax.instances = [];
})(window);

jax.extend({
    /**
     * Function to calculate and perform the animation or animations
     *
     * @param   {Array}  params
     * @param   {Object} opts
     * @returns {jax}
     */
    animate : function(params, opts) {
        var tween    = ((opts != undefined) && (opts.tween != undefined))    ? opts.tween : 25;
        var speed    = ((opts != undefined) && (opts.speed != undefined))    ? Math.round(opts.speed / tween) : 20;
        var trace    = ((opts != undefined) && (opts.trace != undefined))    ? opts.trace : null;
        var complete = ((opts != undefined) && (opts.complete != undefined)) ? opts.complete : null;
        var easingX  = null;
        var easingY  = null;

        if ((opts != undefined) && (opts.easing != undefined)) {
            easingX = opts.easing;
        }
        if ((opts != undefined) && (opts.easingX != undefined)) {
            easingX = opts.easingX;
        }
        if ((opts != undefined) && (opts.easingY != undefined)) {
            easingY = opts.easingY;
        }

        // If elements have already been selected, use them as the overriding elements
        if (this.length > 0) {
            var realParams = [];
            for (var i = 0; i < this.length; i++) {
                realParams.push([this[i], params]);
            }
            params = realParams;
        }

        var elems = [];
        // Iterate through the params passed.
        for (var e = 0; e < params.length; e++) {
            var fadeChange   = null;
            var widthChange  = null;
            var heightChange = null;
            var steps        = null;
            var elemSteps    = [];
            var elem         = params[e][0];

            // Convert into an array if not one already
            if ((params[e][1].constructor == Array) && (params[e][1][0].constructor != Array)) {
                params[e][1] = [params[e][1]];
            }

            // Iterate through the animation parameters of the elements passed.
            for (var m = 0; m < params[e][1].length; m++) {
                var type = params[e][1][m][0];
                switch (type) {
                    case 'move':
                        steps = this.calcSteps(
                            params[e][1][m][1].x,
                            params[e][1][m][1].y,
                            parseInt(window.jax(elem).css('left')),
                            parseInt(window.jax(elem).css('top')), tween, easingX,  easingY
                        );
                        break;
                    case 'slide':
                        var backPos = window.jax(elem).css('background-position');
                        if ((backPos != null) && (backPos.toString().indexOf('px') != -1)) {
                            backPos = backPos.split(' ');
                            var orgX = parseInt(backPos[0]);
                            var orgY = parseInt(backPos[1]);
                        } else {
                            var orgX = 0;
                            var orgY = 0;
                        }
                        steps = this.calcSteps(params[e][1][m][1].x, params[e][1][m][1].y, orgX, orgY, tween, easingX,  easingY);
                        break;
                    case 'resize':
                        steps = this.calcSteps(
                            params[e][1][m][1].w,
                            params[e][1][m][1].h,
                            parseInt(window.jax(elem).innerWidth()),
                            parseInt(window.jax(elem).innerHeight()),
                            tween, easingX,  easingY
                        );
                        break;
                    case 'fade':
                        var curOpacity = window.jax(elem).css('opacity');
                        fadeChange = params[e][1][m][1].o;
                        if (fadeChange != 0) {
                            window.jax(elem).show();
                        }
                        steps = this.calcSteps(curOpacity, null, params[e][1][m][1].o, null, tween, easingX);
                        break;
                    case 'wipeOff':
                        widthChange = params[e][1][m][1].w;
                        if (widthChange != 0) {
                            window.jax(elem).show();
                        }
                        steps = this.calcSteps(parseInt(window.jax(elem).innerWidth()), null, params[e][1][m][1].w, null, tween, easingX);
                        break;
                    case 'wipeUp':
                        heightChange = params[e][1][m][1].h;
                        if (heightChange != 0) {
                            window.jax(elem).show();
                        }
                        steps = this.calcSteps(parseInt(window.jax(elem).innerHeight()), null, params[e][1][m][1].h, null, tween, easingX);
                        break;
                    case 'scrollX':
                        var curX = (window.jax.isWindow(elem)) ? window.jax().getScrollX() : window.jax(elem).getScrollX();
                        steps = this.calcSteps(curX, null, params[e][1][m][1].x, null, tween, easingX);
                        break;
                    case 'scrollY':
                        var curY = (window.jax.isWindow(elem)) ? window.jax().getScrollY() : window.jax(elem).getScrollY();
                        steps = this.calcSteps(curY, null, params[e][1][m][1].y, null, tween, easingX);
                        break;
                    case 'blendColor':
                    case 'blendBgColor':
                        var blend = window.jax.color(params[e][1][m][1].c1).blend(params[e][1][m][1].c2, tween, easingX);
                        steps = [];
                        for (var w = 0; w < blend.length; w++) {
                            steps.push(blend[w].rgba);
                        }
                        break;
                }
                elemSteps.push([type, steps]);
            }
            elems.push([elem, elemSteps, [fadeChange, widthChange, heightChange]]);
        }

        var animateObj = function(elms, spd, c, i, trace) {
            if (i == null) {
                i = window.jax.random(100000, 999999);
            }
            if ((elms[0] != undefined) && (c < elms[0][1][0][1].length)) {
                for (var q = 0; q < elms.length; q++) {
                    for (var n = 0; n < elms[q][1].length; n++) {
                        var e = elms[q][0];
                        switch(elms[q][1][n][0]) {
                            case 'move':
                                var x = elms[q][1][n][1][c][0];
                                var y = elms[q][1][n][1][c][1];
                                window.jax(e).css('left', x + 'px');
                                window.jax(e).css('top', y + 'px');
                                break;
                            case 'resize':
                                var x = elms[q][1][n][1][c][0];
                                var y = elms[q][1][n][1][c][1];
                                window.jax(e).css('width', x + 'px');
                                window.jax(e).css('height', y + 'px');
                                break;
                            case 'fade':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('opacity', x);
                                break;
                            case 'wipeOff':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('width', x + 'px');
                                break;
                            case 'wipeUp':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('height', x + 'px');
                                break;
                            case 'scrollX':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                if (window.jax.isWindow(elem)) {
                                    elem.scrollTo(x, 0);
                                } else {
                                    window.jax(e)[0].scrollLeft = x;
                                }
                                break;
                            case 'scrollY':
                                var x = null;
                                var y = elms[q][1][n][1][c];
                                if (window.jax.isWindow(elem)) {
                                    elem.scrollTo(0, y);
                                } else {
                                    window.jax(e)[0].scrollTop = y;
                                }
                                break;
                            case 'slide':
                                var x = elms[q][1][n][1][c][0];
                                var y = elms[q][1][n][1][c][1];
                                window.jax(e).css('background-position', x + 'px ' + y + 'px');
                                break;
                            case 'blendColor':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('color', x);
                                break;
                            case 'blendBgColor':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('background-color', x);
                                break;
                        }
                        if (trace != null) {
                            trace.apply(undefined, [{"obj" : e, "x" : x, "y" : y, "i" : c}]);
                        }
                    }
                }
                c++;
                window.jax.instances[i] = setTimeout(function() { animateObj(elms, spd, c, i, trace); }, spd);
            } else {
                for (var q = 0; q < elms.length; q++) {
                    var e = elms[q][0];
                    if (elms[q][2][0] != null) {
                        if (elms[q][2][0] == 0) {
                            window.jax(e).hide();
                        }
                        window.jax(e).css('opacity', elms[q][2][0]);
                    } else if (elms[q][2][1] != null) {
                        if (elms[q][2][1] == 0) {
                            window.jax(e).hide();
                        }
                        window.jax(e).css('width', elms[q][2][1] + 'px');
                    } else if (elms[q][2][2] != null) {
                        if (elms[q][2][2] == 0) {
                            window.jax(e).hide();
                        }
                        window.jax(e).css('height', elms[q][2][2] + 'px');
                    }
                }

                if (complete != null) {
                    complete();
                }

                window.jax.instances[i] = clearTimeout(window.jax.instances[i]);
                window.jax.instances[i] = undefined;
                delete window.jax.instances[i];
            }
        };

        animateObj(elems, speed, 0, null, trace);
        return this;
    },
    /**
     * Function to calculate the in between steps of the animations
     *
     * @param   {Mixed}    a
     * @param   {Mixed}    b
     * @param   {Mixed}    c
     * @param   {Mixed}    d
     * @param   {Number}   tween
     * @param   {Function} easingX
     * @param   {Function} easingY
     * @returns {Array}
     */
    calcSteps : function(a, b, c, d, tween, easingX,  easingY) {
        // Reset the array.
        var steps = [];

        // Make sure the values are numbers, calculate any increment notation
        if ((typeof c == 'string') && ((c.indexOf('+=') != -1) || (c.indexOf('-=') != -1))) {
            a = parseFloat(a);
            var inc = c;
            c = a;
            eval('c ' + inc);
        } else {
            c = parseFloat(c);
            if ((typeof a == 'string') && ((a.indexOf('+=') != -1) || (a.indexOf('-=') != -1))) {
                var inc = a;
                a = c;
                eval('a ' + inc);
            } else {
                a = parseFloat(a);
            }
        }

        tween = parseFloat(tween);

        // Calculate the total "distance" from point a to point b
        var aTotal = c - a;
        var bTotal = null;

        if ((b != null) && (d != null)) {
            // Make sure the values are numbers, calculate any increment notation
            d = parseFloat(d);
            if ((typeof b == 'string') && ((b.indexOf('+=') != -1) || (b.indexOf('-=') != -1))) {
                var inc = b;
                b = d;
                eval('b ' + inc);
            } else {
                b = parseFloat(b);
            }
            bTotal = d - b;
        }

        if ((easingX == undefined) || (easingX == null) || (typeof easingX != 'function')) {
            easingX = window.jax.tween.linear;
        }
        if ((easingY == undefined) || (easingY == null) || (typeof easingY != 'function')) {
            easingY = easingX;
        }

        // Calculate the steps
        for (var i = 0; i <= tween; i++) {
            var curA = Math.round(easingX(i, a, aTotal, tween));
            if (bTotal != null) {
                var curB = Math.round(easingY(i, b, bTotal, tween));
            }

            if (bTotal != null) {
                steps.unshift([curA, curB]);
            } else {
                steps.push(curA);
            }
        }

        return steps;
    }
});
/**
 * effects/slide.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'slide'
     *
     * @param   {Mixed}  x
     * @param   {Mixed}  y
     * @param   {Object} opts
     * @returns {jax}
     */
    slide : function(x, y, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['slide', {"x" : x, "y" : y}], opts);}, this.delayTime);
            } else {
                this.animate(['slide', {"x" : x, "y" : y}], opts);
            }
        }
        return this;
    }
});
/**
 * effects/tween.js
 */
(function(window){
    /**
     * Create the tween object and functions under the main jax object.
     *
     * Tween object and functions, based on Robert Penner's base easing functions (http://www.robertpenner.com/easing/)
     * and George McGinley's extended easing functions (https://github.com/danro/jquery-easing/blob/master/jquery.easing.js)
     */
    window.jax.tween = {
        /** Function to calculate a linear tween step */
        linear : function(curStep, start, end, totalSteps) {
            return (end * (curStep / totalSteps)) + start;
        },
        /** Tween ease-in object */
        easein : {
            /** Function to calculate a quadratic easing-in tween step */
            quad  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep) + start;
            },
            /** Function to calculate a cubic easing-in tween step */
            cubic : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep * curStep) + start;
            },
            /** Function to calculate a quartic easing-in tween step */
            quart : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep * curStep * curStep) + start;
            },
            /** Function to calculate a quintic easing-in tween step */
            quint : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep * curStep * curStep * curStep) + start;
            },
            /** Function to calculate a sinusoidal easing-in tween step */
            sine  : function(curStep, start, end, totalSteps) {
                return (-end * Math.cos(curStep / totalSteps * (Math.PI / 2))) + end + start;
            },
            /** Function to calculate an exponential easing-in tween step */
            expo  : function(curStep, start, end, totalSteps) {
                return (end * Math.pow(2, 10 * (curStep / totalSteps - 1))) + start;
            },
            /** Function to calculate a circular easing-in tween step */
            circ  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (-end * (Math.sqrt(1 - (curStep * curStep)) - 1)) + start;
            },
            /** Function to calculate an elastic easing-in tween step */
            elastic : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                var p = 0;
                var a = end;
                if (curStep == 0) return start;  if ((curStep /= totalSteps) == 1) return start + end;  if (!p) p = totalSteps * .3;
                if (a < Math.abs(end)) { a = end; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(end / a);
                return -(a * Math.pow(2, 10 * (curStep -= 1)) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p)) + start;
            },
            /** Function to calculate a back easing-in tween step */
            back : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                return end * (curStep /= totalSteps) * curStep *((s + 1) * curStep - s) + start;
            },
            /** Function to calculate a bounce easing-in tween step */
            bounce : function(curStep, start, end, totalSteps) {
                return end - window.jax.tween.easeout.bounce((totalSteps - curStep), 0, end, totalSteps) + start;
            }
        },
        /** Tween ease-out object */
        easeout : {
            /** Function to calculate a quadratic easing-out tween step */
            quad  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (-end * curStep * (curStep - 2)) + start;
            },
            /** Function to calculate a cubic easing-out tween step */
            cubic : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (end *(curStep * curStep * curStep + 1)) + start;
            },
            /** Function to calculate a quartic easing-out tween step */
            quart : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (-end * (curStep * curStep * curStep * curStep - 1)) + start;
            },
            /** Function to calculate a quintic easing-out tween step */
            quint : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (end * ((curStep * curStep * curStep * curStep * curStep) + 1)) + start;
            },
            /** Function to calculate a sinusoidal easing-out tween step */
            sine  : function(curStep, start, end, totalSteps) {
                return (end * Math.sin(curStep / totalSteps * (Math.PI / 2))) + start;
            },
            /** Function to calculate an exponential easing-out tween step */
            expo  : function(curStep, start, end, totalSteps) {
                return (end * (-Math.pow(2, -10 * curStep / totalSteps) + 1)) + start;
            },
            /** Function to calculate a circular easing-out tween step */
            circ  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (end * Math.sqrt(1 - (curStep * curStep))) + start;
            },
            /** Function to calculate an elastic easing-out tween step */
            elastic : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                var p = 0;
                var a = end;
                if (curStep == 0) return start;  if ((curStep /= totalSteps) == 1) return start + end;  if (!p) p = totalSteps * .3;
                if (a < Math.abs(end)) { a = end; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(end / a);
                return a * Math.pow(2, -10 * curStep) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p) + end + start;
            },
            /** Function to calculate a back easing-out tween step */
            back : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                return end * ((curStep = curStep / totalSteps - 1) * curStep * ((s + 1) * curStep + s) + 1) + start;
            },
            /** Function to calculate a bounce easing-out tween step */
            bounce : function(curStep, start, end, totalSteps) {
                if ((curStep /= totalSteps) < (1/2.75)) {
                    return end * (7.5625 * curStep * curStep) + start;
                } else if (curStep < (2 / 2.75)) {
                    return end * (7.5625 * (curStep -= (1.5/2.75)) * curStep + .75) + start;
                } else if (curStep < (2.5/2.75)) {
                    return end * (7.5625 * (curStep -= (2.25/2.75)) * curStep + .9375) + start;
                } else {
                    return end * (7.5625 * (curStep -= (2.625/2.75)) * curStep + .984375) + start;
                }
            }
        },
        /** Tween ease-in-out object */
        easeinout : {
            /** Function to calculate a quadratic easing-in-out tween step */
            quad  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep) + start;
                curStep--;
                return (-end / 2 * (curStep * (curStep - 2) - 1)) + start;
            },
            /** Function to calculate a cubic easing-in-out tween step */
            cubic : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep * curStep) + start;
                curStep -= 2;
                return ((end / 2) * (curStep * curStep * curStep + 2)) + start;
            },
            /** Function to calculate a quartic easing-in-out tween step */
            quart : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep * curStep * curStep) + start;
                curStep -= 2;
                return ((-end / 2) * (curStep * curStep * curStep * curStep - 2)) + start;
            },
            /** Function to calculate a quintic easing-in-out tween step */
            quint : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep * curStep * curStep * curStep) + start;
                curStep -= 2;
                return ((end / 2) * ((curStep * curStep * curStep * curStep * curStep) + 2)) + start;
            },
            /** Function to calculate a sinusoidal easing-in-out tween step */
            sine  : function(curStep, start, end, totalSteps) {
                return ((-end / 2) * (Math.cos(Math.PI * curStep / totalSteps) - 1)) + start;
            },
            /** Function to calculate an exponential easing-in-out tween step */
            expo  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * Math.pow(2, 10 * (curStep - 1))) + start;
                curStep--;
                return ((end / 2) * (-Math.pow(2, -10 * curStep) + 2)) + start;
            },
            /** Function to calculate a circular easing-in-out tween step */
            circ  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((-end / 2) * (Math.sqrt(1 - (curStep * curStep)) - 1)) + start;
                curStep -= 2;
                return ((end / 2) * (Math.sqrt(1 - (curStep * curStep)) + 1)) + start;
            },
            /** Function to calculate an elastic easing-in-out tween step */
            elastic  : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                var p = 0;
                var a = end;
                if (curStep == 0) return start;  if ((curStep /= totalSteps / 2) == 2) return start + end;  if (!p) p = totalSteps * (.3 * 1.5);
                if (a < Math.abs(end)) { a = end; var s = p/4; }
                else var s = p / (2 * Math.PI) * Math.asin(end / a);
                if (curStep < 1) return -.5 * (a * Math.pow(2, 10 * (curStep -= 1)) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p)) + start;
                return a * Math.pow(2, -10 * (curStep -= 1)) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p) * .5 + end + start;
            },
            /** Function to calculate a back easing-in-out tween step */
            back : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                if ((curStep /= totalSteps / 2) < 1) return end / 2 * (curStep * curStep * (((s *= (1.525)) + 1) * curStep - s)) + start;
                return end / 2 * ((curStep -= 2) * curStep * (((s *= (1.525)) + 1) * curStep + s) + 2) + start;
            },
            /** Function to calculate a bounce easing-in-out tween step */
            bounce : function(curStep, start, end, totalSteps) {
                if (curStep < totalSteps / 2) return window.jax.tween.easeout.bounce((curStep * 2), 0, end, totalSteps) * .5 + start;
                return window.jax.tween.easeout.bounce(((curStep * 2) - totalSteps), 0, end, totalSteps) * .5 + end * .5 + start;
            }
        }
    };
})(window);

/**
 * event.js
 */
jax.extend({
    /**
     * Function to attach a custom event handler to an object
     *
     * @param   {String}   evt
     * @param   {Function} func
     * @param   {Boolean}  cap
     * @returns {jax}
     */
    on : function(evt, func, cap) {
        var cp = (cap) ? cap : false;
        // If nothing has been selected, attach event to either the window or document object
        if (this.length == 0) {
            var obj = ((evt == 'scroll') || (evt == 'resize')) ? window : document;
            obj.addEventListener(evt, func, cp);
            // Else, attach event to the selected object(s)
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener(evt, func, cp);
            }
        }
        return this;
    },
    /**
     * Function to detach a custom event handler to an object
     *
     * @param   {String}   evt
     * @param   {Function} func
     * @param   {Boolean}  cap
     * @returns {jax}
     */
    off : function(evt, func, cap) {
        var cp = (cap) ? cap : false;
        // If nothing has been selected, detach event to either the window or document object
        if (this.length == 0) {
            var obj = ((evt == 'scroll') || (evt == 'resize')) ? window : document;
            obj.removeEventListener(evt, func, cp);
            // Else, detach event to the selected object(s)
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(evt, func, cp);
            }
        }
        return this;
    },
    /**
     * Function to trigger a custom event handler to an object
     *
     * @param   {String}  evt
     * @param   {Boolean} bubbles
     * @param   {Boolean} cancelable
     * @returns {jax}
     */
    trigger : function(evt, bubbles, cancelable) {
        var bub = (bubbles != null)    ? bubbles    : true;
        var can = (cancelable != null) ? cancelable : true;
        var e = (document.createEvent) ?
            document.createEvent('Event') : new CustomEvent('Event', {"bubbles" : bub, "cancelable" : can});

        // Check the event type and the obj accordingly.
        if (this.length == 0) {
            var obj = ((evt == 'scroll') || (evt == 'resize')) ? window : document;

            e.initEvent(evt, bub, can);
            obj.dispatchEvent(e);
        } else {
            for (var i = 0; i < this.length; i++) {
                e.initEvent(evt, bub, can);
                this[i].dispatchEvent(e);
            }
        }
        return this;
    }
});
/**
 * event/key.js
 */
jax.extend({
    /**
     * Function to attach a event to the onkeydown of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    keydown : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onkeydown = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onkeypress of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    keypress : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onkeypress = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onkeyup of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    keyup : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onkeyup = func;
            }
        }
        return this;
    }
});
/**
 * event/focus.js
 */
jax.extend({
    /**
     * Function to attach a event to the onfocus of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    focus : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onfocus = func;
            }
        }
        return this;
    }
});
/**
 * event/drag.js
 */
jax.extend({
    /**
     * Function to attach drag actions (start/on/stop), both on mouse and touch events
     *
     * @param   {Object} opts
     * @returns {jax}
     */
    drag : function(opts) {
        if (this.length > 0) {
            window.jax.drag = {
                startX : 0,
                startY : 0,
                orgX   : 0,
                orgY   : 0,
                deltaX : 0,
                deltaY : 0,
                isDrag : false
            };
            var startDrag   = ((opts != undefined) && (opts.startDrag != undefined)) ? opts.startDrag : null;
            var onDrag      = ((opts != undefined) && (opts.onDrag != undefined))    ? opts.onDrag : null;
            var stopDrag    = ((opts != undefined) && (opts.stopDrag != undefined))  ? opts.stopDrag : null;
            var cursor      = ((opts != undefined) && (opts.cursor != undefined))    ? opts.cursor : null;
            var bound       = ((opts != undefined) && (opts.bound != undefined))     ? opts.bound : null;
            var axis        = ((opts != undefined) && (opts.axis != undefined))      ? opts.axis : null;
            var boundTop    = null;
            var boundLeft   = null;
            var boundRight  = null;
            var boundBottom = null;
            var onDragFunc  = null;

            for (var i = 0; i < this.length; i++) {
                var obj = this[i];
                if (bound != null) {
                    if (bound.constructor == String) {
                        boundTop    = 0;
                        boundLeft   = 0;
                        if (bound == 'parent') {
                            boundRight  = window.jax(window.jax(obj).parent()).width() - window.jax(obj).width();
                            boundBottom = window.jax(window.jax(obj).parent()).height() - window.jax(obj).height();
                        } else {
                            boundRight  = window.jax(bound).width() - window.jax(obj).width();
                            boundBottom = window.jax(bound).height() - window.jax(obj).height();
                        }
                    } else if (bound.constructor == Object) {
                        if (bound.top != undefined) {
                            boundTop = (bound.top.constructor == String) ? 0 : bound.top;
                        }
                        if (bound.left != undefined) {
                            boundLeft = (bound.left.constructor == String) ? 0 : bound.left;
                        }
                        if (bound.right != undefined) {
                            boundRight = (bound.right.constructor == String) ?
                                window.jax(bound.right).width() - window.jax(obj).width() : bound.right;
                        }
                        if (bound.bottom != undefined) {
                            boundBottom = (bound.bottom.constructor == String) ?
                                window.jax(bound.bottom).height() - window.jax(obj).height() : bound.bottom;
                        }
                    }
                }
                if (window.jax.browser.mobile) {
                    window.jax(this[i]).touchstart(function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        window.jax.drag.startX = window.jax(obj).mouseX(event);
                        window.jax.drag.startY = window.jax(obj).mouseY(event);
                        window.jax.drag.orgX   = window.jax(obj).css('left');
                        window.jax.drag.orgY   = window.jax(obj).css('top');
                        window.jax.drag.isDrag = true;
                        if (startDrag != null) {
                            startDrag(event, obj);
                        }
                        onDragFunc = function(event){
                            var x = window.jax().mouseX(event) - window.jax.drag.startX;
                            var y = window.jax().mouseY(event) - window.jax.drag.startY;
                            window.jax.drag.deltaX = window.jax(obj).css('left') - window.jax.drag.orgX;
                            window.jax.drag.deltaY = window.jax(obj).css('top') - window.jax.drag.orgY;
                            if (bound != null) {
                                if ((boundLeft != null) && (x < boundLeft)) {
                                    x = boundLeft;
                                }
                                if ((boundTop != null) && (y < boundTop)) {
                                    y = boundTop;
                                }
                                if ((boundRight != null) && (x >= boundRight)) {
                                    x = boundRight;
                                }
                                if ((boundBottom != null) && (y >= boundBottom)) {
                                    y = boundBottom;
                                }
                            }

                            switch (axis) {
                                case 'x':
                                    window.jax(obj).css('left', x + 'px');
                                    break;
                                case 'y':
                                    window.jax(obj).css('top', y + 'px');
                                    break;
                                default:
                                    window.jax(obj).css('left', x + 'px').css('top', y + 'px');
                            }

                            if (onDrag != null) {
                                onDrag(event, obj);
                            }
                        };
                        window.jax(obj).touchmove(onDragFunc);
                    });
                    window.jax(this[i]).touchend(function(event) {
                        window.jax(obj).off('touchmove', onDragFunc);
                        if (stopDrag != null) {
                            stopDrag(event, obj);
                        }
                    });
                } else {
                    if ((cursor != null) && (cursor.over != undefined)) {
                        this[i].onmouseover = function(event) {
                            window.jax(obj).css('cursor', cursor.over);
                        };
                    }
                    this[i].onmousedown = function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        window.jax.drag.startX = window.jax(obj).mouseX(event);
                        window.jax.drag.startY = window.jax(obj).mouseY(event);
                        window.jax.drag.orgX   = window.jax(obj).css('left');
                        window.jax.drag.orgY   = window.jax(obj).css('top');
                        window.jax.drag.isDrag = true;
                        if ((cursor != null) && (cursor.down != undefined)) {
                            window.jax(obj).css('cursor', cursor.down);
                        }
                        if (startDrag != null) {
                            startDrag(event, obj);
                        }
                        onDragFunc = function(event){
                            event.preventDefault();
                            event.stopPropagation();
                            var x = window.jax().mouseX(event) - window.jax.drag.startX;
                            var y = window.jax().mouseY(event) - window.jax.drag.startY;
                            window.jax.drag.deltaX = window.jax(obj).css('left') - window.jax.drag.orgX;
                            window.jax.drag.deltaY = window.jax(obj).css('top') - window.jax.drag.orgY;
                            if (bound != null) {
                                if ((boundLeft != null) && (x < boundLeft)) {
                                    x = boundLeft;
                                }
                                if ((boundTop != null) && (y < boundTop)) {
                                    y = boundTop;
                                }
                                if ((boundRight != null) && (x >= boundRight)) {
                                    x = boundRight;
                                }
                                if ((boundBottom != null) && (y >= boundBottom)) {
                                    y = boundBottom;
                                }
                            }

                            switch (axis) {
                                case 'x':
                                    window.jax(obj).css('left', x + 'px');
                                    break;
                                case 'y':
                                    window.jax(obj).css('top', y + 'px');
                                    break;
                                default:
                                    window.jax(obj).css('left', x + 'px').css('top', y + 'px');
                            }

                            if (onDrag != null) {
                                onDrag(event, obj);
                            }
                        };
                        window.jax(document).on('mousemove', onDragFunc);
                    };

                    window.jax(document).on('mouseup', function(event) {
                        event.stopPropagation();
                        window.jax.drag.isDrag = false;
                        window.jax(document).off('mousemove', onDragFunc);
                        if (cursor != null) {
                            window.jax(obj).css('cursor', 'auto');
                        }
                        if (stopDrag != null) {
                            stopDrag(event, obj);
                        }
                    }, true);

                    this[i].onmouseup = function(event) {
                        window.jax.drag.isDrag = false;
                        window.jax(document).off('mousemove', onDragFunc);
                        if (cursor != null) {
                            window.jax(obj).css('cursor', 'auto');
                        }
                        if (stopDrag != null) {
                            stopDrag(event, obj);
                        }
                    };
                }
            }
        }
        return this;
    }
});
/**
 * event/select.js
 */
jax.extend({
    /**
     * Function to attach a event to the onselect of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    select : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onselect = func;
            }
        }
        return this;
    }
});
/**
 * event/touch.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchcancel of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchcancel : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchcancel', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the touchend of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchend : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchend', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the touchenter of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchenter : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchenter', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the touchleave of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchleave : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchleave', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the touchmove of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchmove : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchmove', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the touchstart of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchstart : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchstart', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});
/**
 * event/mouse.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmousedown of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mousedown : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmousedown = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseenter of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseenter : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseenter = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseleave of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseleave : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseleave = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmousemove of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mousemove : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmousemove = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseout of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseout : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseout = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseover of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseover : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseover = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseup of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseup : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseup = func;
            }
        }
        return this;
    }
});
/**
 * event/click.js
 */
jax.extend({
    /**
     * Function to attach a event to the onclick of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    click : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onclick = func;
            }
        }
        return this;
    }
});
/**
 * event/scroll.js
 */
jax.extend({
    /**
     * Function to attach a event to the onscroll of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    scroll : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onscroll = func;
            }
        }
        return this;
    }
});
/**
 * event/change.js
 */
jax.extend({
    /**
     * Function to attach a event to the onchange of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    change : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onchange = func;
            }
        }
        return this;
    }
});
/**
 * event/blur.js
 */
jax.extend({
    /**
     * Function to attach a event to the onblur of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    blur : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onblur = func;
            }
        }
        return this;
    }
});
/**
 * event/hover.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseover and onmouseout (hover) of an object
     *
     * @param   {Function} func1
     * @param   {Function} func2
     * @returns {jax}
     */
    hover : function(func1, func2) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseover = func1;
                this[i].onmouseout  = func2;
            }
        }
        return this;
    }
});
/**
 * event/submit.js
 */
jax.extend({
    /**
     * Function to attach a event to the onsubmit of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    submit : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onsubmit = func;
            }
        }
        return this;
    }
});
/**
 * filter.js
 */
jax.extend({
    /**
     * Function to apply a filter to the collection
     * Available filters are:
     *     :contains('some text'), :even, :odd, :checked, :selected, :hidden, :visible
     *     :button, :checkbox, :file, :image, :password, :radio, :reset, :submit, :text
     *
     * @param   {String} filter
     * @returns {jax}
     */
    filter : function(filter) {
        var ary = [];

        if (filter.indexOf(':contains(') != -1) {
            var text = filter.substring(filter.indexOf('(') + 1);
            text = text.substring(0, text.lastIndexOf(')'));
            if ((text.substring(0, 1) == '"') || (text.substring(0, 1) == "'")) {
                text = text.substring(1);
                text = text.substring(0, (text.length - 1));
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i].innerHTML.indexOf(text) != -1) {
                    ary.push(this[i]);
                }
            }
        }

        switch (filter) {
            case ':even':
                for (var i = 0; i < this.length; i++) {
                    if ((i % 2) == 0) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':odd':
                for (var i = 0; i < this.length; i++) {
                    if ((i % 2) != 0) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':checked':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].checked) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':selected':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].selected) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':hidden':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].style.display == 'none') {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':visible':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].style.display != 'none') {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':button':
            case ':checkbox':
            case ':file':
            case ':image':
            case ':password':
            case ':radio':
            case ':reset':
            case ':submit':
            case ':text':
                var type = filter.substring(1);
                for (var i = 0; i < this.length; i++) {
                    if (this[i].getAttribute('type') == type) {
                        ary.push(this[i]);
                    }
                }
                break;
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});

(function(window){
    /**
     * Function to check if the container contains the contained
     *
     * @param   {Object}  container
     * @param   {Object}  contained
     * @returns {Boolean}
     */
    window.jax.contains = function(container, contained) {
        // Function to traverse a node
        var traverse = function(parent, child) {
            var contains = false;
            if (parent.hasChildNodes()) {
                for (var i = 0; i < parent.childNodes.length; i++) {
                    if (parent.childNodes[i] == child) {
                        contains = true;
                    } else if (!contains) {
                        contains = traverse(parent.childNodes[i], child);
                    }
                }
            }
            return contains;
        };

        return traverse(container, contained);
    };
})(window);

/**
 * filter/eq.js
 */
jax.extend({
    /**
     * Function to reduce the collection to the single element at the index
     *
     * @param   {Number} index
     * @returns {jax}
     */
    eq : function(index) {
        if (this[index] != undefined) {
            var elem = this[index];
            this.clear();
            this.push(elem);
        }

        return this;
    }
});
/**
 * filter/has.js
 */
jax.extend({
    /**
     * Function to filter the collection to elements that only contain the selector passed
     *
     * @param   {String} selector
     * @returns {jax}
     */
    has : function(selector) {
        var ary = [];
        var x = window.jax(this.selector + ' ' + selector);
        for (var i = 0; i < x.length; i++) {
            for (var j = 0; j < this.length; j++) {
                if ((window.jax.contains(this[j], x[i])) && (ary.indexOf(this[j]) == -1)) {
                    ary.push(this[j]);
                }
            }
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});
/**
 * filter/not.js
 */
jax.extend({
    /**
     * Function to negate the collection based on the negative selection
     *
     * @param   {Mixed} selector
     * @returns {jax}
     */
    not : function(selector) {
        var x = window.jax(selector);
        var ary = [];
        for (var i = 0; i < this.length; i++) {
            var neq = true;
            for (var j = 0; j < x.length; j++) {
                if (this[i] === x[j]) {
                    neq = false
                }
            }
            if (neq) {
                ary.push(this[i]);
            }
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});
/**
 * filter/gt.js
 */
jax.extend({
    /**
     * Function to filter the collection to the elements greater than the index
     *
     * @param   {Number} index
     * @returns {jax}
     */
    gt : function(index) {
        var ary = [];
        for (var i = 0; i < this.length; i++) {
            if (i > index) {
                ary.push(this[i]);
            }
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});
/**
 * filter/lt.js
 */
jax.extend({
    /**
     * Function to filter the collection to the elements less than the index
     *
     * @param   {Number} index
     * @returns {jax}
     */
    lt : function(index) {
        var ary = [];
        for (var i = 0; i < this.length; i++) {
            if (i < index) {
                ary.push(this[i]);
            }
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});
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
            return(json.indexOf('{') != -1) ? JSON.parse(decodeURIComponent(json)) : window.jax.ajax(json);
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
 * load/load.js
 */
jax.extend({
    /**
     * Function to add a function to the onload stack.
     *
     * @param {Function} func
     */
    load : function(func) {
        var objs = (this.length > 0) ? this.toArray() : [window];
        for (var i = 0; i < objs.length; i++) {
            // Get old onload function(s), if they exist.
            var oldOnLoad = obj[i].onload;

            if (typeof obj[i].onload != 'function') {
                obj[i].onload = func;
            } else {
                obj[i].onload = function() {
                    if (oldOnLoad) {
                        oldOnLoad();
                    }
                    func();
                };
            }
        }
    }
});
/**
 * load/unload.js
 */
jax.extend({
    /**
     * Function to add a function to the unload stack.
     *
     * @param {Function} func
     */
    unload : function(func) {
        var objs = (this.length > 0) ? this.toArray() : [window];
        for (var i = 0; i < objs.length; i++) {
            // Get old unload function(s), if they exist.
            var oldUnLoad = obj[i].onunload;

            if (typeof obj[i].onunload != 'function') {
                obj[i].onunload = func;
            } else {
                obj[i].onunload = function() {
                    if (oldUnLoad) {
                        oldUnLoad();
                    }
                    func();
                };
            }
        }
    }
});
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
 * mouse/y.js
 */
jax.extend({
    /**
     * Function to retrieve the current mouse/touch Y-position, either relative to the screen or an element
     *
     * @param   {Event} event
     * @returns {Number}
     */
    mouseY : function(event) {
        if ((event.changedTouches != undefined) && (event.changedTouches[0] != undefined)) {
            var yPos = event.changedTouches[0].pageY;
        } else {
            var yPos = ((window.event) && (window.event.clientY)) ? window.event.clientY : event.clientY;
        }
        if (this[0] != null) {
            yPos -= this[0].offsetTop;
        }
        return yPos;
    },
    /**
     * Alias function for mouseY
     *
     * @param   {Event} event
     * @returns {Number}
     */
    touchY : function(event) {
        return this.mouseY(event);
    }
});
/**
 * mouse/x.js
 */
jax.extend({
    /**
     * Function to retrieve the current mouse/touch X-position, either relative to the screen or an element
     *
     * @param   {Event} event
     * @returns {Number}
     */
    mouseX : function(event) {
        if ((event.changedTouches != undefined) && (event.changedTouches[0] != undefined)) {
            var xPos = event.changedTouches[0].pageX;
        } else {
            var xPos = ((window.event) && (window.event.clientX)) ? window.event.clientX : event.clientX;
        }
        if (this[0] != undefined) {
            xPos -= this[0].offsetLeft;
        }
        return xPos;
    },
    /**
     * Alias function for mouseX
     *
     * @param   {Event} event
     * @returns {Number}
     */
    touchX : function(event) {
        return this.mouseX(event);
    }
});
/**
 * scroll.js
 */
jax.extend({
    /**
     * Function to retrieve the current scroll X-position, either relative to the screen or an element
     *
     * @returns {Number}
     */
    getScrollX : function() {
        var xPos = 0;
        if (this[0] != undefined) {
            xPos = this[0].scrollLeft;
        } else {
            if (((document.documentElement) && (document.documentElement.scrollLeft)) || (document.body.scrollLeft)) {
                xPos = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
            } else {
                xPos = window.scrollX;
            }
        }
        return xPos;
    },
    /**
     * Function to retrieve the current scroll Y-position, either relative to the screen or an element
     *
     * @returns {Number}
     */
    getScrollY : function() {
        var yPos = 0;
        if (this[0] != undefined) {
            yPos = this[0].scrollTop;
        } else {
            if (((document.documentElement) && (document.documentElement.scrollTop)) || (document.body.scrollTop)) {
                yPos = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
            } else {
                yPos = window.scrollY;
            }
        }
        return yPos;
    },
    /**
     * Function to retrieve the scrollable width of the element
     *
     * @returns {Number}
     */
    getScrollWidth : function() {
        var wid = 0;
        if (this[0] != undefined) {
            wid = this[0].scrollWidth;
        } else {
            if (((document.documentElement) && (document.documentElement.scrollWidth)) || (document.body.scrollWidth)) {
                wid = (document.documentElement.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth;
            } else {
                wid = document.body.scrollWidth;
            }
        }
        return wid;
    },
    /**
     * Function to retrieve the scrollable height of the element
     *
     * @returns {Number}
     */
    getScrollHeight : function() {
        var hgt = 0;
        if (this[0] != undefined) {
            hgt = this[0].scrollHeight;
        } else {
            if (((document.documentElement) && (document.documentElement.scrollHeight)) || (document.body.scrollHeight)) {
                hgt = (document.documentElement.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight;
            } else {
                hgt = document.body.scrollHeight;
            }
        }
        return hgt;
    }
});
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
                var value = window.localStorage[name];
                if ((value.indexOf('{') != -1) || (value.indexOf('[') != -1)) {
                    value = JSON.parse(decodeURIComponent(value));
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
        if (quot.toLowerCase() == 'single') {
            str = str.replace(/\\'/g, "'");
        } else if (quot.toLowerCase() == 'double') {
            str = str.replace(/\\"/g, '"');
        } else {
            str = str.replace(/\\'/g, "'").replace(/\\"/g, '"');
        }
        return str;
    };
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
 * val.js
 */
jax.extend({
    /**
     * Function to get or set element value(s)
     *
     * @param   {Mixed} value
     * @returns {Mixed}
     */
    val : function(value) {
        // If getting value(s)
        if (value == null) {
            var v = [];
            for (var i = 0; i < this.length; i++) {
                if (this[i].nodeName == 'SELECT') {
                    for (var j = 0; j < this[i].options.length; j++) {
                        if (this[i].options[j].selected) {
                            v.push(this[i].options[j].value);
                        }
                    }
                } else if (((this[i].type == 'checkbox') || (this[i].type == 'radio')) && (this[i].checked)) {
                    v.push(this[i].value);
                } else if (this[i].value != undefined) {
                    v.push(this[i].value);
                } else if (this[i].getAttribute('value') != undefined) {
                    v.push(this[i].getAttribute('value'));
                } else if (this[i].innerHTML != undefined) {
                    v.push(this[i].innerHTML);
                } else if (this[i].innerText != undefined) {
                    v.push(this[i].innerText);
                } else if (this[i].nodeValue != undefined) {
                    v.push(this[i].nodeValue);
                }
            }
            return (v.length == 1) ? v[0] : v;
            // If setting value(s)
        } else {
            for (var i = 0; i < this.length; i++) {
                if ((this[i].type == 'checkbox') || (this[i].type == 'radio')) {
                    if (value.constructor == Array) {
                        for (var k = 0; k < value.length; k++) {
                            if (this[i].value == value[k]) {
                                this[i].checked = true;
                            }
                        }
                    } else if (this[i].value == value) {
                        this[i].checked = true;
                    }
                } else if (this[i].nodeName == 'SELECT') {
                    for (var j = 0; j < this[i].options.length; j++) {
                        if (value.constructor == Array) {
                            for (var k = 0; k < value.length; k++) {
                                if (this[i].options[j].value == value[k]) {
                                    this[i].options[j].selected = true;
                                }
                            }
                        } else if (this[i].options[j].value == value) {
                            this[i].options[j].selected = true;
                        }
                    }
                } else {
                    if (this[i].value != undefined) {
                        this[i].value = value;
                    } else if (this[i].getAttribute('value') != undefined) {
                        this[i].setAttribute('value', value);
                    } else if (this[i].innerHTML != undefined) {
                        this[i].innerHTML = value;
                    } else if (this[i].innerText != undefined) {
                        this[i].innerText = value;
                    } else if (this[i].nodeValue != undefined) {
                        this[i].nodeValue = value;
                    }
                }
            }
        }
    },
    /**
     * Function to get the HTML value of the first element
     *
     * @returns {String}
     */
    html : function() {
        return (this[0] != undefined) ? this[0].innerHTML : null;
    },
    /**
     * Function to get the text content of the first element
     *
     * @returns {String}
     */
    text : function() {
        return (this[0] != undefined) ? (this[0].innerText || this[0].textContent) : null;
    }
});
