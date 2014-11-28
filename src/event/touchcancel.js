/**
 * event/touchcancel.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchcancel of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchcancel : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchcancel', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});