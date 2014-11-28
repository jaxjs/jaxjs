/**
 * json.js
 */
(function(window){
    window.jax.json = {
        /**
         * Function to parse either JSON string or a file that contains a JSON string
         *
         * @param   {String} json
         * @returns {Object}
         */
        parse : function(json) {
            return(json.indexOf('{') != -1) ? JSON.parse(decodeURIComponent(json)) : window.jax.ajax(json);
        },
        /**
         * Function to turn an object into a JSON string
         *
         * @param   {Object} obj
         * @returns {String}
         */
        toString : function(obj) {
            return JSON.stringify(obj);
        }
    };
})(window);