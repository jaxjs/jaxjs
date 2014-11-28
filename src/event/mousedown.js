/**
 * event/mousedown.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmousedown of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mousedown : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmousedown = func;
            }
        }
        return this;
    }
});