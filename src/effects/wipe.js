/**
 * effects/wipe.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'wipeOff'
     *
     * @param   {Mixed}  w
     * @param   {Object} opts
     * @returns {jax}
     */
    wipeOff : function(w, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['wipeOff', {"w" : w}], opts);}, this.delayTime);
            } else {
                this.animate(['wipeOff', {"w" : w}], opts);
            }
        }
        return this;
    },
    /**
     * Alias function to animate selected elements via 'wipeUp'
     *
     * @param   {Mixed}  h
     * @param   {Object} opts
     * @returns {jax}
     */
    wipeUp : function(h, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['wipeUp', {"h" : h}], opts);}, this.delayTime);
            } else {
                this.animate(['wipeUp', {"h" : h}], opts);
            }
        }
        return this;
    }
});