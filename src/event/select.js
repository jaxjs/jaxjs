/**
 * event/select.js
 */
jax.extend({
    /**
     * Function to attach a event to the onselect of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    select : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onselect = func;
            }
        }
        return this;
    }
});