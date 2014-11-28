/**
 * event/mouseover.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseover of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseover : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseover = func;
            }
        }
        return this;
    }
});