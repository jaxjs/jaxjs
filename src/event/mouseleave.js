/**
 * event/mouseleave.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseleave of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseleave : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseleave = func;
            }
        }
        return this;
    }
});