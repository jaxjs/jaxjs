/**
 * event/touchend.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchend of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchend : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchend', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});