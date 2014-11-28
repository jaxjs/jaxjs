/**
 * event/touchenter.js
 */
jax.extend({
    /**
     * Function to attach a event to the touchenter of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    touchenter : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener('touchenter', function(event) {
                    func(event);
                    event.stopPropagation();
                    event.preventDefault();
                }, true);
            }
        }
        return this;
    }
});