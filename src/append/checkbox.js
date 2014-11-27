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
                    if ((attrib == 'style') && (window.jax.browser.msie) && (window.jax.browser.version < 8)) {
                        var styles = (att.lastIndexOf(';') == (att.length - 1)) ? att.substring(0, (att.length - 1)) : att;
                        var sty = styles.replace('; ', ';').split(';');
                        for (var j = 0; j < sty.length; j++) {
                            var styleVal = sty[j].replace(': ', ':').split(':');
                            this.setCss(newElem, styleVal[0].trim(), styleVal[1].trim());
                        }
                    } else {
                        newElem.setAttribute(attrib, att);
                    }
                }
            }

            // Set elements' values and append them to the parent element.
            var valuesAry = (objValues[i].constructor != Array) ? [objValues[i], objValues[i]] : objValues[i];
            newElem.setAttribute('value', valuesAry[0]);

            if ((window.jax.browser.msie) && (window.jax.browser.version < 8)) {
                newElem.defaultChecked = (objMarked.indexOf(valuesAry[1]) != -1);
            } else {
                newElem.checked = (objMarked.indexOf(valuesAry[1]) != -1);
            }

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