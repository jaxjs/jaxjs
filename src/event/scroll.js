/**
 * event/scroll.js
 */
jax.extend({
    /**
     * Function to attach a event to the onscroll of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    scroll : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onscroll = func;
            }
        }
        return this;
    }
});