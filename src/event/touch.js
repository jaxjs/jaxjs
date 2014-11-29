/**
 * event/touch.js
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
    },
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
    },
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
    },
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
    },
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
    },
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