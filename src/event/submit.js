/**
 * event/submit.js
 */
jax.extend({
    /**
     * Function to attach a event to the onsubmit of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    submit : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onsubmit = func;
            }
        }
        return this;
    }
});