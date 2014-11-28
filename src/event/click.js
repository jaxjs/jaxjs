/**
 * event/click.js
 */
jax.extend({
    /**
     * Function to attach a event to the onclick of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    click : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onclick = func;
            }
        }
        return this;
    }
});