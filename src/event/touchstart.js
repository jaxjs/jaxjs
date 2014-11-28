/**
 * event/touchstart.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchstart of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchstart : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchstart', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});