/**
 * string/html.js
 */
(function(window){
    /**
     * Function to convert certain HTML characters to HTML entities.
     *
     * @param   {Boolean} quot
     * @param   {Boolean} strict
     * @returns {String}
     */
    window.jax.String.prototype.html = function(quot, strict) {
        var str = this.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        if (quot != undefined) {
            str = str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
        }
        if (strict != undefined) {
            str = str.replace(/\(/g, '&#40;').replace(/\)/g, '&#41;').replace(/\//g, '&#47;')
                .replace(/:/g, '&#58;').replace(/\[/g, '&#91;').replace(/\]/g, '&#93;')
                .replace(/\\/g, '&#92;').replace(/{/g, '&#123;').replace(/}/g, '&#125;');
        }
        return str;
    };

    /**
     * Function to convert certain HTML entities back to HTML characters.
     *
     * @param   {Boolean} quot
     * @param   {Boolean} strict
     * @returns {String}
     */
    window.jax.String.prototype.dehtml = function(quot, strict) {
        var str = this.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        if (quot != undefined) {
            str = str.replace(/&quot;/g, '"').replace(/&#39;/g, "'");
        }
        if (strict != undefined) {
            str = str.replace(/&#40;/g, '(').replace(/&#41;/g, ')').replace(/&#47;/g, '/')
                .replace(/&#58;/g, ':').replace(/&#91;/g, '[').replace(/&#93;/g, ']')
                .replace(/&#92;/g, '\\').replace(/&#123;/g, '{').replace(/&#125;/g, '}');
        }
        return str;
    };

    /**
     * Function to convert any links in the string to clickable HTML links.
     *
     * @param   {Boolean} tar
     * @returns {String}
     */
    window.jax.String.prototype.links = function(tar) {
        var str     = this;
        var matches = [];
        var targ    = (tar != null) ? ' target="_blank"' : '';

        var protocolMatches = this.match(/[f|ht]+tp:\/\/[^\s]*/g);
        var linkMatches     = this.match(/\s[\w]+[a-zA-Z0-9\.\-\_]+(\.[a-zA-Z]{2,4})/g);
        var mailMatches     = this.match(/[a-zA-Z0-9\.\-\_+%]+@[a-zA-Z0-9\-\_\.]+\.[a-zA-Z]{2,4}/g);

        if (protocolMatches[0] != undefined) {
            for (var i = 0; i < protocolMatches.length; i++) {
                matches.push([protocolMatches[i], '<a href="' + protocolMatches[i].trim() + '"' + targ + '>' +
                    protocolMatches[i].trim() + '</a>']);
            }
        }

        if (linkMatches[0] != undefined) {
            for (var i = 0; i < linkMatches.length; i++) {
                var lnk = linkMatches[i].trim();
                if (lnk.substring(0, 4) == 'ftp.') {
                    lnk = 'ftp://' + lnk;
                } else if (lnk.substring(0, 4) == 'www.') {
                    lnk = 'http://' + lnk;
                } else if (lnk.substring(0, 4) != 'http') {
                    lnk = 'http://' + lnk;
                }
                matches.push([linkMatches[i], ' <a href="' + lnk + '"' + targ + '>' + linkMatches[i].trim() + '</a>']);
            }
        }

        if (mailMatches[0] != undefined) {
            for (var i = 0; i < mailMatches.length; i++) {
                matches.push([mailMatches[i], '<a href="mailto:' + mailMatches[i].trim() + '"' + targ + '>' +
                    mailMatches[i].trim() + '</a>']);
            }
        }

        if (matches[0] != undefined) {
            for (var i = 0; i < matches.length; i++) {
                str = str.replace(matches[i][0], matches[i][1]);
            }
        }

        return str;
    };
})(window);
