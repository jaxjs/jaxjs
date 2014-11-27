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