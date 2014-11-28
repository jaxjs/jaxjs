/**
 * core/target.js
 */
(function(window){
    /**
     * Function to the target identifier of the document's URI
     *
     * @param   {String} u
     * @returns {String}
     */
    window.jax.target = function(u) {
        var url = (u != null) ? u : location.href;
        var target = null;
        if (url.indexOf('#') != -1) {
            target = url.substring(url.indexOf('#') + 1);
        }
        return target;
    };
})(window);
