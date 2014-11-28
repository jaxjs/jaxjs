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