/**
 * effects.js
 */
jax.extend({
    delayTime : 0,
    /**
     * Function to show all current elements
     *
     * @param   {String} disp
     * @returns {jax}
     */
    show : function(disp) {
        if (disp == null) {
            disp = 'block';
        }
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = disp;
        }
        return this;
    },
    /**
     * Function to hide all current elements
     *
     * @param   {String} disp
     * @returns {jax}
     */
    hide : function(disp) {
        if (disp == null) {
            disp = 'none';
        }
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = disp;
        }
        return this;
    },
    /**
     * Function to toggle display of selected elements
     *
     * @param   {String} disp
     * @returns {jax}
     */
    toggle : function(disp) {
        if (disp == null) {
            disp = 'block';
        }
        for (var i = 0; i < this.length; i++) {
            this[i].style.display = (window.jax(this[i]).css('display') == 'none') ? disp : 'none';
        }
        return this;
    },
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