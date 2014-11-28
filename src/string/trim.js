/**
 * string/trim.js
 */
(function(window){
    /** Function to trim the whitespace from the left of the string */
    window.jax.String.prototype.trimLeft = function() {
        return this.replace(/^\s+/, '');
    };

    /** Function to trim the whitespace from the right of the string */
    window.jax.String.prototype.trimRight = function() {
        return this.replace(/\s+$/, '');
    };
})(window);