/**
 * mouse/x.js
 */
jax.extend({
    /**
     * Function to retrieve the current mouse/touch X-position, either relative to the screen or an element
     *
     * @param   {Event} event
     * @returns {Number}
     */
    mouseX : function(event) {
        if ((event.changedTouches != undefined) && (event.changedTouches[0] != undefined)) {
            var xPos = event.changedTouches[0].pageX;
        } else {
            var xPos = ((window.event) && (window.event.clientX)) ? window.event.clientX : event.clientX;
        }
        if (this[0] != undefined) {
            xPos -= this[0].offsetLeft;
        }
        return xPos;
    },
    /**
     * Alias function for mouseX
     *
     * @param   {Event} event
     * @returns {Number}
     */
    touchX : function(event) {
        return this.mouseX(event);
    }
});