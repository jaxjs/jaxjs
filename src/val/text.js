/**
 * val/text.js
 */
jax.extend({
    /**
     * Function to get the text content of the first element
     *
     * @returns {String}
     */
    text : function() {
        return (this[0] != undefined) ? (this[0].innerText || this[0].textContent) : null;
    }
});