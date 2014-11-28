/**
 * event/touchleave.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchleave of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchleave : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchleave', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});