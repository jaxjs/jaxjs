/**
 * string/slashes.js
 */
(function(window){
    /**
     * Function to add slashes to a string.
     *
     * @param   {Boolean} quot
     * @returns {String}
     */
    window.jax.String.prototype.addslashes = function(quot) {
        var str = this.replace(/\\/g, '\\\\');
        if ((quot != undefined) && (quot.toLowerCase() == 'single')) {
            str = str.replace(/\'/g, "\\'");
        } else if ((quot != undefined) && (quot.toLowerCase() == 'double')) {
            str = str.replace(/\"/g, '\\"');
        } else {
            str = str.replace(/\"/g, '\\"').replace(/\'/g, "\\'");
        }
        return str;
    };

    /**
     * Function to strip slashes from a string.
     *
     * @param   {Boolean} quot
     * @returns {String}
     */
    window.jax.String.prototype.stripslashes = function(quot) {
        var str = this.replace(/\\\\/g, '\\');
        if (quot.toLowerCase() == 'single') {
            str = str.replace(/\\'/g, "'");
        } else if (quot.toLowerCase() == 'double') {
            str = str.replace(/\\"/g, '"');
        } else {
            str = str.replace(/\\'/g, "'").replace(/\\"/g, '"');
        }
        return str;
    };
})(window);
