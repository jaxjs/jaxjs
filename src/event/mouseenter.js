/**
 * event/mouseenter.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseenter of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseenter : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseenter = func;
            }
        }
        return this;
    }
});