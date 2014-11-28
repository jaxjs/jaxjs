/**
 * core/timing.js
 */
(function(window){
    window.jax.tO = null;
    window.jax.iN = null;

    /**
     * Global delay function that uses setTimeout
     *
     * @param {Number}   ms
     * @param {Function} func
     */
    window.jax.delay = function(ms, func) {
        if ((ms == null) || (typeof ms != 'number') || (isNaN(ms))) {
            throw 'You must pass a millisecond value.'
        }
        window.jax.tO = setTimeout(func, ms);
    };

    /**
     * Global repeat function that uses setInterval
     *
     * @param {Number}   ms
     * @param {Function} func
     */
    window.jax.repeat = function(ms, func) {
        if ((ms == null) || (typeof ms != 'number') || (isNaN(ms))) {
            throw 'You must pass a millisecond value.'
        }
        window.jax.iN = setInterval(func, ms);
    };

    /** Function to clear out the global delay timeout function */
    window.jax.clearDelay = function() {
        clearTimeout(window.jax.tO);
    };

    /** Function to clear out the global repeat interval function */
    window.jax.clearRepeat = function() {
        clearInterval(window.jax.iN);
    };
})(window);