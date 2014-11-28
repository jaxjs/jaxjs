/**
 * event/touchmove.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchmove of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchmove : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchmove', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});