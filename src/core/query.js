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

        // Loop through the elements to assemble the qery string.
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
                                query += encodeURIComponent(name + '[' + chkCount[name] + ']') + '=' + encodeURIComponent(data.elements[i].value);
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
                                query += encodeURIComponent(name + '[' + chkCount[name] + ']') + '=' + encodeURIComponent(data.elements[i].options[j].value);
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
