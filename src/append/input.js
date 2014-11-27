/**
 * append/input.js
 */
jax.extend({
    /**
     * Alias function to append a new input element to the current element
     *
     * @param   {Object}  attribs
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendInput : function(attribs, pre) {
        return this.append('input', attribs, null, pre);
    },
    /**
     * Alias function to prepend a new input element to the current element
     *
     * @param   {Object} attribs
     * @returns {jax}
     */
    prependInput : function(attribs) {
        return this.append('input', attribs, null, true);
    }
});