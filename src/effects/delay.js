/**
 * effects/delay.js
 */
jax.extend({
    delayTime : 0,
    /**
     * Function to set the delay time for the next animation to fire
     *
     * @param   {Number} ms
     * @returns {jax}
     */
    delay : function(ms) {
        this.delayTime = ((ms != null) && (typeof ms == 'number') && (!isNaN(ms))) ? ms : 0;
        return this;
    }
});