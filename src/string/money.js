/**
 * string/money.js
 */
(function(window){
    /**
     * Function to convert a number to currency-formatted string
     *
     * @param   {String} cur
     * @param   {Number} dec
     * @returns {String}
     */
    window.jax.String.prototype.money = function(cur, dec) {
        var num = this;
        var decimal = '';

        if (cur == null) {
            cur = '$';
        }
        if (dec == null) {
            dec = 2;
        }

        if (num.indexOf('.') != -1) {
            var numAry = num.split('.');
            var intgr = parseInt(numAry[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            if (dec > 0) {
                decimal = Number('.' + numAry[1]).toFixed(dec);
            } else {
                decimal = '';
            }
        } else {
            var intgr = parseInt(num.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
            if (dec > 0) {
                decimal = '.';
                for (var i = 0; i < dec; i++) {
                    decimal += '0';
                }
            } else {
                decimal = '';
            }
        }

        decimal = parseFloat(decimal);

        return cur + new Number(intgr + decimal).toFixed(dec);
    };
})(window);
