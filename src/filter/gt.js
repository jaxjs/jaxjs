/**
 * filter/gt.js
 */
jax.extend({
    /**
     * Function to filter the collection to the elements greater than the index
     *
     * @param   {Number} index
     * @returns {jax}
     */
    gt : function(index) {
        var ary = [];
        for (var i = 0; i < this.length; i++) {
            if (i > index) {
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