/**
 * mouse/y.js
 */
jax.extend({
    /**
     * Function to retrieve the current mouse/touch Y-position, either relative to the screen or an element
     *
     * @param   {Event} event
     * @returns {Number}
     */
    mouseY : function(event) {
        if ((window.jax.browser.mobile) && (event.changedTouches != undefined) && (event.changedTouches[0] != undefined)) {
            var yPos = event.changedTouches[0].pageY;
        } else {
            var yPos = (window.jax.browser.msie) ? window.event.clientY : event.clientY;
        }
        if (this[0] != null) {
            yPos -= this[0].offsetTop;
        }
        return yPos;
    },
    /**
     * Alias function for mouseY
     *
     * @param   {Event} event
     * @returns {Number}
     */
    touchY : function(event) {
        return this.mouseY(event);
    }
});