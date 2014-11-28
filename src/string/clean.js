/**
 * string/clean.js
 */
(function(window){
    /**
     * Function to clean any common MS Word-based characters.
     *
     * @param   {Boolean} html
     * @returns {String}
     */
    window.jax.String.prototype.clean = function(html) {
        if (html != null) {
            var apos = "&#39;";
            var quot = "&#34;";
            var dash = "&#150;";
        } else {
            var apos = "'";
            var quot = '"';
            var dash = "-";
        }

        var str = this;
        str = str.replace(new RegExp(String.fromCharCode(8217), 'g'), apos);
        str = str.replace(new RegExp(String.fromCharCode(8220), 'g'), quot);
        str = str.replace(new RegExp(String.fromCharCode(8221), 'g'), quot);
        str = str.replace(new RegExp(String.fromCharCode(8211), 'g'), dash);
        str = str.replace(new RegExp(String.fromCharCode(45), 'g'), dash);
        str = str.replace(new RegExp(String.fromCharCode(8230), 'g'), "...");

        return str;
    };
})(window);
