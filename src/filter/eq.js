/**
 * filter/eq.js
 */
jax.extend({
    /**
     * Function to reduce the collection to the single element at the index
     *
     * @param   {Number} index
     * @returns {jax}
     */
    eq : function(index) {
        if (this[index] != undefined) {
            var elem = this[index];
            this.clear();
            this.push(elem);
        }

        return this;
    }
});