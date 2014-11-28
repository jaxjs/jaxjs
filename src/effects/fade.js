/**
 * effects/fade.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'fade'
     *
     * @param   {Mixed}  o
     * @param   {Object} opts
     * @returns {jax}
     */
    fade : function(o, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['fade', {"o" : o}], opts);}, this.delayTime);
            } else {
                this.animate(['fade', {"o" : o}], opts);
            }
        }
        return this;
    }
});