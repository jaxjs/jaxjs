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
    }
});