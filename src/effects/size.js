/**
 * effects/slide.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'size'
     *
     * @param   {Mixed}  x
     * @param   {Mixed}  y
     * @param   {Object} opts
     * @returns {jax}
     */
    size : function(x, y, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['size', {"x" : x, "y" : y}], opts);}, this.delayTime);
            } else {
                this.animate(['size', {"x" : x, "y" : y}], opts);
            }
        }
        return this;
    }
});