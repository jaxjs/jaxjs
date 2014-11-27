/**
 * children/parent.js
 */
jax.extend({
    /**
     * Function to get the parent element of the current element
     *
     * @returns {Mixed}
     */
    parent : function() {
        return ((this[0] != undefined) && (this[0].parentNode != undefined)) ? this[0].parentNode : undefined;
    }
});