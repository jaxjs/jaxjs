/**
 * attrib/data.js
 */
jax.extend({
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