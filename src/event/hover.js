/**
 * event/hover.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmouseover and onmouseout (hover) of an object
     *
     * @param   {Function} func1
     * @param   {Function} func2
     * @returns {jax}
     */
    hover : function(func1, func2) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseover = func1;
                this[i].onmouseout  = func2;
            }
        }
        return this;
    }
});