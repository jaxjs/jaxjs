/**
 * event/change.js
 */
jax.extend({
    /**
     * Function to attach a event to the onchange of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    change : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onchange = func;
            }
        }
        return this;
    }
});