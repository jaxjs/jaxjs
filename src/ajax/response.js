/**
 * ajax/response.js
 */
(function(window){
    /**
     * Function to parse a response
     *
     * @param   {Object}   response
     * @param   {String}   type
     * @param   {Boolean}  fields
     * @param   {String}   delim
     * @param   {Boolean}  async
     * @param   {Function} trace
     * @returns {Object}
     */
    window.jax.parseResponse = function(response, type, fields, delim, async, trace) {
        var obj;
        var msie = (navigator.userAgent.toLowerCase().indexOf('msie') != -1);

        // Detect application type
        if (type == null) {
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
                    if (msie) {
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
                        attribs.push(tree.attributes[j].nodeName + ' : "' + new window.jax.String(tree.attributes[j].nodeValue).html(null, true).addslashes('double').replace(/\n/g, '\\n') + '"');
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
                    attribs.push('nodeValue : "' + new window.jax.String(nValue).html(null, true).addslashes('double').replace(/\n/g, '\\n') + '"');
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
                    if (msie) {
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
