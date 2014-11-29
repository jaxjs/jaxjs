/**
 * effects/resize.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'resize'
     *
     * @param   {Mixed}  w
     * @param   {Mixed}  h
     * @param   {Object} opts
     * @returns {jax}
     */
    resize : function(w, h, opts) {
        if (this.length > 0) {
            if ((this.delayTime) && (this.delayTime > 0)) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['resize', {"w" : w, "h" : h}], opts);}, this.delayTime);
            } else {
                this.animate(['resize', {"w" : w, "h" : h}], opts);
            }
        }
        return this;
    }
});