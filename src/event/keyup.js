/**
 * event/keyup.js
 */
jax.extend({
    /**
     * Function to attach a event to the onkeyup of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    keyup : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onkeyup = func;
            }
        }
        return this;
    }
});