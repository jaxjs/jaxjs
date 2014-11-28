/**
 * event/mouseout.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseout of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseout : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseout = func;
            }
        }
        return this;
    }
});