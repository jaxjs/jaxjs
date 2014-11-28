/**
 * event/keypress.js
 */
jax.extend({
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
    }
});