/**
 * effects/move.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'move'
     *
     * @param   {Mixed}  x
     * @param   {Mixed}  y
     * @param   {Object} opts
     * @returns {jax}
     */
    move : function(x, y, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['move', {"x" : x, "y" : y}], opts);}, this.delayTime);
            } else {
                this.animate(['move', {"x" : x, "y" : y}], opts);
            }
        }
        return this;
    }
});