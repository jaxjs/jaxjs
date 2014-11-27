/**
 * filter/not.js
 */
jax.extend({
    /**
     * Function to negate the collection based on the negative selection
     *
     * @param   {Mixed} selector
     * @returns {jax}
     */
    not : function(selector) {
        var x = window.jax(selector);
        var ary = [];
        for (var i = 0; i < this.length; i++) {
            var neq = true;
            for (var j = 0; j < x.length; j++) {
                if (this[i] === x[j]) {
                    neq = false
                }
            }
            if (neq) {
                ary.push(this[i]);
            }
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});