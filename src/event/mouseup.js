/**
 * event/mouseup.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseup of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseup : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseup = func;
            }
        }
        return this;
    }
});