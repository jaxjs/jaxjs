/**
 * val/html.js
 */
jax.extend({
    /**
     * Function to get the HTML value of the first element
     *
     * @returns {String}
     */
    html : function() {
        return (this[0] != undefined) ? this[0].innerHTML : null;
    }
});