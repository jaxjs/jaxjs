/**
 * append/textarea.js
 */
jax.extend({
    /**
     * Alias function to append a new textarea element to the current element
     *
     * @param   {Object}  attribs
     * @param   {String}  value
     * @param   {Boolean} pre
     * @returns {jax}
     */
    appendTextarea : function(attribs, value, pre) {
        return this.append('textarea', attribs, value, pre);
    },
    /**
     * Alias function to prepend a new textarea element to the current element
     *
     * @param   {Object} attribs
     * @param   {String} value
     * @returns {jax}
     */
    prependTextarea : function(attribs, value) {
        return this.append('textarea', attribs, value, true);
    }
});