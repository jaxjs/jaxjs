/**
 * ready.js
 */
jax.extend({
    /**
     * Function to trigger a function when the document object (implied) is loaded & ready.
     *
     * @param {Function} func
     */
    ready : function(func) {
        document.addEventListener('DOMContentLoaded', func, false);
    }
});