/**
 * string/case.js
 */
(function(window){
    /**
     * Function to convert string from under_score or hyphenated to camelCase.
     *
     * @returns {String}
     */
    window.jax.String.prototype.toCamelcase = function() {
        var str = this;
        var delim = (str.indexOf('_') != -1) ? '_' : '-';

        var strAry = str.split(delim);
        var camelCase = '';
        for (var i = 0; i < strAry.length; i++) {
            if (i == 0) {
                camelCase += strAry[i];
            } else {
                camelCase += strAry[i].substring(0, 1).toUpperCase() + strAry[i].substring(1);
            }
        }

        return camelCase;
    };

    /**
     * Function to convert string from hyphenated or camelCase to under_score.
     *
     * @returns {String}
     */
    window.jax.String.prototype.toUnderscore = function() {
        var str = this;
        var under_score = '';

        if (str.indexOf('-') != -1) {
            under_score = str.replace('-', '_').toLowerCase();
        } else {
            for (var i = 0; i < str.length; i++) {
                if (i == 0) {
                    under_score += str[i].toLowerCase();
                } else {
                    if (str[i] == str[i].toUpperCase()) {
                        under_score += ('_' + str[i].toLowerCase());
                    } else {
                        under_score += str[i].toLowerCase();
                    }
                }
            }
        }

        return under_score;
    };

    /**
     * Function to convert string from under_score or camelCase to hyphenated.
     *
     * @returns {String}
     */
    window.jax.String.prototype.toHyphen = function() {
        var str = this;
        var hyphen = '';

        if (str.indexOf('_') != -1) {
            hyphen = str.replace('_', '-').toLowerCase();
        } else {
            for (var i = 0; i < str.length; i++) {
                if (i == 0) {
                    hyphen += str[i].toLowerCase();
                } else {
                    if (str[i] == str[i].toUpperCase()) {
                        hyphen += ('-' + str[i].toLowerCase());
                    } else {
                        hyphen += str[i].toLowerCase();
                    }
                }
            }
        }

        return hyphen;
    };
})(window);
