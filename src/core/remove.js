/**
 * core/remove.js
 */
jax.extend({
    /**
     * Function to remove the selected element(s)
     *
     * @returns {jax}
     */
    remove : function() {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                var child = this[i] && this[i].parentNode;
                if ((child) && (this[i].parentNode != undefined)) {
                    this[i].parentNode.removeChild(this[i]);
                }
            }
        }
        return this;
    },
    /**
     * Function to remove the child contents of the selected elements
     *
     * @returns {jax}
     */
    empty : function() {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].innerHTML = '';
            }
        }
        return this;
    }
});