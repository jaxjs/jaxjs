/**
 * filter/has.js
 */
jax.extend({
    /**
     * Function to filter the collection to elements that only contain the selector passed
     *
     * @param   {String} selector
     * @returns {jax}
     */
    has : function(selector) {
        var ary = [];
        var x = window.jax(this.selector + ' ' + selector);
        for (var i = 0; i < x.length; i++) {
            for (var j = 0; j < this.length; j++) {
                if ((window.jax.contains(this[j], x[i])) && (ary.indexOf(this[j]) == -1)) {
                    ary.push(this[j]);
                }
            }
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});