/**
 * event/blur.js
 */
jax.extend({
    /**
     * Function to attach a event to the onblur of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    blur : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onblur = func;
            }
        }
        return this;
    }
});