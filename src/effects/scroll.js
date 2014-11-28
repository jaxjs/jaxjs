/**
 * effects/scroll.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'scrollX'
     *
     * @param   {Mixed}  x
     * @param   {Object} opts
     * @returns {jax}
     */
    scrollX : function(x, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['scrollX', {"x" : x}], opts);}, this.delayTime);
            } else {
                this.animate(['scrollX', {"x" : x}], opts);
            }
        }
        return this;
    },
    /**
     * Alias function to animate selected elements via 'scrollY'
     *
     * @param   {Mixed}  y
     * @param   {Object} opts
     * @returns {jax}
     */
    scrollY : function(y, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['scrollY', {"y" : y}], opts);}, this.delayTime);
            } else {
                this.animate(['scrollY', {"y" : y}], opts);
            }
        }
        return this;
    }
});