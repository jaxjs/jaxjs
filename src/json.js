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
            var obj;
            if (json.indexOf('{') != -1) {
                try {
                    obj = JSON.parse(decodeURIComponent(json));
                } catch (e) {
                    obj = JSON.parse(json);
                }
            } else {
                obj = window.jax.ajax(json);
            }
            return obj;
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