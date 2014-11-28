/**
 * ajax/get.js
 */
(function(window){
    /**
     * Alias function to perform a GET AJAX request
     *
     * @param   {String} url
     * @param   {Object} opts
     * @returns {Mixed}
     */
    window.jax.get = function(url, opts) {
        if (opts == undefined) {
            opts = {method : 'get'};
        } else if ((opts.method == undefined) || ((opts.method != undefined) && (opts.method.toLowerCase() != 'get'))) {
            opts.method = 'get';
        }
        return window.jax.ajax(url, opts);
    };
})(window);
