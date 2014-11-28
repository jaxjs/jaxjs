/**
 * string/random.js
 */
(function(window){
    /**
     * Function to generate random alphanumeric string of a predefined length.
     *
     * @param   {Number} len
     * @param   {Boolean} caps
     * @returns {String}
     */
    window.jax.String.random = function(len, caps) {
        // Array of alphanumeric characters. The O, 0, I, 1 and l have been removed to eliminate confusion.
        var str = '';
        var chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

        for (var i = 0; i < len; i++) {
            var num = (Math.floor(Math.random() * chars.length));
            str += (caps != null) ? chars.charAt(num).toUpperCase() : chars.charAt(num);
        }

        return str;
    };
})(window);
