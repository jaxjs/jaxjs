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
        var objChild  = document.createElement('fieldset');
        objChild.setAttribute('class', 'radio-btn-fieldset');

        // Create the child elements.
        var i = 0;
        for (var key in values) {
            var newElem = document.createElement('input');
            newElem.setAttribute('type', 'radio');
            newElem.setAttribute('class', 'radio-btn');

            // Set any element attributes.
            if ((attribs != undefined) && (attribs != null)) {
                for (var attrib in attribs) {
                    var att = ((attrib == 'id') && (i > 0)) ? attribs[attrib] + i : attribs[attrib];
                    if (attrib == 'tabindex') {
                        att = att + i;
                    }
                    newElem.setAttribute(attrib, att);
                }
            }

            // Set elements' values and append them to the parent element.
            newElem.setAttribute('value', key);

            if (marked != null) {
                newElem.checked = (marked == key);
            }
            objChild.appendChild(newElem);

            var spanElem = document.createElement('span');
            spanElem.setAttribute('class', 'radio-span');
            spanElem.innerHTML = values[key];

            objChild.appendChild(spanElem);
            i++;
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