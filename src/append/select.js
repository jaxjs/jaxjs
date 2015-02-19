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

        // Set any element attributes.
        if ((attribs != undefined) && (attribs != null)) {
            for (var attrib in attribs) {
                objChild.setAttribute(attrib, attribs[attrib]);
            }
        }

        // If value passed was a YEAR flag, calculate the year range and set the values
        if ((values.constructor == String) && (values.indexOf('YEAR') != -1)) {
            var years   = {"----" : "----"};
            var yearAry = values.split('_');

            if ((yearAry[1] != undefined) && (yearAry[2] != undefined)) {
                if (yearAry[1] < yearAry[2]) {
                    for (var i = yearAry[1]; i <= yearAry[2]; i++) {
                        years[i.toString()] = i.toString();
                    }
                } else {
                    for (var i = yearAry[1]; i >= yearAry[2]; i--) {
                        years[i.toString()] = i.toString();
                    }
                }
            } else if (yearAry[1] != undefined) {
                var d = new Date();
                var year = d.getFullYear();
                if (year < yearAry[1]) {
                    for (var i = year; i <= yearAry[1]; i++) {
                        years[i.toString()] = i.toString();
                    }
                } else {
                    for (var i = year; i >= yearAry[1]; i--) {
                        years[i.toString()] = i.toString();
                    }
                }
            } else {
                var d = new Date();
                var year = d.getFullYear();
                for (var i = year; i <= (year + 10); i++) {
                    years[i.toString()] = i.toString();
                }
            }
            values = years;
        // Else, set the values based of a pre-defined flag, or the an array of values passed.
        } else {
            switch (values) {
                // Months, numeric short values.
                case 'HOURS_12':
                case 'MONTHS_SHORT':
                    values = {
                        "--" : "--", "01" : "01", "02" : "02", "03" : "03", "04" : "04", "05" : "05",
                        "06" : "06", "07" : "07", "08" : "08", "09" : "09", "10" : "10", "11" : "11",
                        "12" : "12"
                    };
                    break;
                // Days of Month, numeric short values.
                case 'DAYS_OF_MONTH':
                    values = {
                        "--" : "--", "01" : "01", "02" : "02", "03" : "03", "04" : "04", "05" : "05",
                        "06" : "06", "07" : "07", "08" : "08", "09" : "09", "10" : "10", "11" : "11",
                        "12" : "12", "13" : "13", "14" : "14", "15" : "15", "16" : "16", "17" : "17",
                        "18" : "18", "19" : "19", "20" : "20", "21" : "21", "22" : "22", "23" : "23",
                        "24" : "24", "25" : "25", "26" : "26", "27" : "27", "28" : "28", "29" : "29",
                        "30" : "30", "31" : "31"
                    };
                    break;
                // Hours, 24-hour values.
                case 'HOURS_24':
                    values = {
                        "--" : "--", "00" : "00", "01" : "01", "02" : "02", "03" : "03", "04" : "04",
                        "05" : "05", "06" : "06", "07" : "07", "08" : "08", "09" : "09", "10" : "10",
                        "11" : "11", "12" : "12", "13" : "13", "14" : "14", "15" : "15", "16" : "16",
                        "17" : "17", "18" : "18", "19" : "19", "20" : "20", "21" : "21", "22" : "22",
                        "23" : "23"
                    };
                    break;
                // Minutes, incremental by 1 minute.
                case 'MINUTES':
                    values = {
                        "--" : "--", "00" : "00", "01" : "01", "02" : "02", "03" : "03", "04" : "04",
                        "05" : "05", "06" : "06", "07" : "07", "08" : "08", "09" : "09", "10" : "10",
                        "11" : "11", "12" : "12", "13" : "13", "14" : "14", "15" : "15", "16" : "16",
                        "17" : "17", "18" : "18", "19" : "19", "20" : "20", "21" : "21", "22" : "22",
                        "23" : "23", "24" : "24", "25" : "25", "26" : "26", "27" : "27", "28" : "28",
                        "29" : "29", "30" : "30", "31" : "31", "32" : "32", "33" : "33", "34" : "34",
                        "35" : "35", "36" : "36", "37" : "37", "38" : "38", "39" : "39", "40" : "40",
                        "41" : "41", "42" : "42", "43" : "43", "44" : "44", "45" : "45", "46" : "46",
                        "47" : "47", "48" : "48", "49" : "49", "50" : "50", "51" : "51", "52" : "52",
                        "53" : "53", "54" : "54", "55" : "55", "56" : "56", "57" : "57", "58" : "58",
                        "59" : "59"
                    };
                    break;
                // Minutes, incremental by 5 minutes.
                case 'MINUTES_5':
                    values = {
                        "--" : "--", "00" : "00", "05" : "05", "10" : "10", "15" : "15", "20" : "20",
                        "25" : "25", "30" : "30", "35" : "35", "40" : "40", "45" : "45", "50" : "50",
                        "55" : "55"
                    };
                    break;
                // Minutes, incremental by 10 minutes.
                case 'MINUTES_10':
                    values = {"--" : "--", "00" : "00", "10" : "10", "20" : "20", "30" : "30", "40" : "40", "50" : "50"};
                    break;
                // Minutes, incremental by 15 minutes.
                case 'MINUTES_15':
                    values = {"--" : "--", "00" : "00", "15" : "15", "30" : "30", "45" : "45"};
                    break;
                default:
                    if (optionsFile != null) {
                        values = window.jax.parseOptionsFile(optionsFile, values);
                    }
            }
        }

        // Create the option elements.
        for (var key in values) {
            var newOpt = document.createElement('option');
            newOpt.setAttribute('value', key);
            if (marked != null) {
                if (marked.constructor != Array) {
                    newOpt.selected = !!((marked == key));
                } else {
                    newOpt.selected = !!((marked.indexOf(key) != -1));
                }
            }
            newOpt.innerHTML = values[key];
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
     * @returns {Mixed}
     */
    window.jax.parseOptionsFile = function(file, values) {
        var xml         = window.jax.ajax(file);
        var optionNames = [];
        var vals        = {};
        if (xml.options.nodes != undefined) {
            for (var i = 0; i < xml.options.nodes.length; i++) {
                if ((xml.options.nodes[i] != undefined) && (xml.options.nodes[i].set.name != undefined)) {
                    optionNames.push(xml.options.nodes[i].set.name);
                }
            }
        }
        // If found, construct the values array based on the values found.
        if (optionNames.indexOf(values) != -1) {
            for (var i = 0; i < xml.options.nodes.length; i++) {
                if ((xml.options.nodes[i] != undefined) && (xml.options.nodes[i].set.name == values)) {
                    for (var j = 0; j < xml.options.nodes[i].set.nodes.length; j++) {
                        if (xml.options.nodes[i].set.nodes[j] != undefined) {
                            vals[xml.options.nodes[i].set.nodes[j].opt.value.toString()] = xml.options.nodes[i].set.nodes[j].opt.nodeValue.toString();
                        }
                    }
                }
            }
        // Else, just set the values array to the original parameter passed.
        } else {
            vals = values;
        }

        return vals;
    };
})(window);