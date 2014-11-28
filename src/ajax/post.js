/**
 * ajax/get.js
 */
(function(window){
    /**
     * Alias function to perform a POST AJAX request
     *
     * @param   {String} url
     * @param   {Object} opts
     * @returns {Mixed}
     */
    window.jax.post = function(url, opts) {
        if (opts == undefined) {
            opts = {method : 'post'};
        } else if ((opts.method == undefined) || ((opts.method != undefined) && (opts.method.toLowerCase() != 'post'))) {
            opts.method = 'post';
        }
        return window.jax.ajax(url, opts);
    };
})(window);