/**
 * string/slug.js
 */
(function(window){
    /**
     * Function to convert a string to an SEO-friendly slug.
     *
     * @param   {String} sep
     * @returns {String}
     */
    window.jax.String.prototype.slug = function(sep) {
        var slg = '';
        var tmpSlg = '';
        if (this.length > 0) {
            if (sep != null) {
                var slgAry = [];
                var urlAry = this.split(sep);
                for (var i = 0; i < urlAry.length; i++) {
                    tmpSlg = urlAry[i].toLowerCase();
                    tmpSlg = tmpSlg.replace(/\&/g, 'and').replace(/([^a-zA-Z0-9 \-\/])/g, '')
                        .replace(/ /g, '-').replace(/-*-/g, '-');
                    slgAry.push(tmpSlg);
                }
                tmpSlg = slgAry.join('/');
                tmpSlg = tmpSlg.replace(/-\/-/g, '/').replace(/\/-/g, '/').replace(/-\//g, '/');
                slg += tmpSlg;
            } else {
                tmpSlg = this.toLowerCase();
                tmpSlg = tmpSlg.replace(/\&/g, 'and').replace(/([^a-zA-Z0-9 \-\/])/g, '')
                    .replace(/ /g, '-').replace(/-*-/g, '-');
                slg += tmpSlg;
                slg = slg.replace(/\/-/g, '/');
            }
            if (slg.lastIndexOf('-') == (slg.length - 1)) {
                slg = slg.substring(0, slg.lastIndexOf('-'));
            }
        }
        return slg;
    };
})(window);
