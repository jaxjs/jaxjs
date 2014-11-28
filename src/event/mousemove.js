/**
 * event/mousemove.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmousemove of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mousemove : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmousemove = func;
            }
        }
        return this;
    }
});