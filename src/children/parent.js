/**
 * children/parent.js
 */
jax.extend({
    /**
     * Function to determine if there is a parent node
     *
     * @returns {Boolean}
     */
    hasParent : function() {
        return ((this[0] != undefined) && (this[0].parentNode != undefined));
    },
    /**
     * Function to get the parent element of the current element
     *
     * @returns {Mixed}
     */
    parent : function() {
        return ((this[0] != undefined) && (this[0].parentNode != undefined)) ? this[0].parentNode : undefined;
    }
});