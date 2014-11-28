/**
 * event.js
 */
jax.extend({
    /**
     * Function to attach a custom event handler to an object
     *
     * @param   {String}   evt
     * @param   {Function} func
     * @param   {Boolean}  cap
     * @returns {jax}
     */
    on : function(evt, func, cap) {
        var cp = (cap) ? cap : false;
        // If nothing has been selected, attach event to either the window or document object
        if (this.length == 0) {
            var obj = ((evt == 'scroll') || (evt == 'resize')) ? window : document;
            obj.addEventListener(evt, func, cp);
            // Else, attach event to the selected object(s)
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i].addEventListener(evt, func, cp);
            }
        }
        return this;
    },
    /**
     * Function to detach a custom event handler to an object
     *
     * @param   {String}   evt
     * @param   {Function} func
     * @param   {Boolean}  cap
     * @returns {jax}
     */
    off : function(evt, func, cap) {
        var cp = (cap) ? cap : false;
        // If nothing has been selected, detach event to either the window or document object
        if (this.length == 0) {
            var obj = ((evt == 'scroll') || (evt == 'resize')) ? window : document;
            obj.removeEventListener(evt, func, cp);
            // Else, detach event to the selected object(s)
        } else {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(evt, func, cp);
            }
        }
        return this;
    },
    /**
     * Function to trigger a custom event handler to an object
     *
     * @param   {String}  evt
     * @param   {Boolean} bubbles
     * @param   {Boolean} cancelable
     * @returns {jax}
     */
    trigger : function(evt, bubbles, cancelable) {
        var bub = (bubbles != null)    ? bubbles    : true;
        var can = (cancelable != null) ? cancelable : true;
        var e = ((window.jax.browser.msie) && (window.jax.browser.version >= 9)) ?
            document.createEvent('Event') : new CustomEvent('Event', {"bubbles" : bub, "cancelable" : can});

        // Check the event type and the obj accordingly.
        if (this.length == 0) {
            var obj = ((evt == 'scroll') || (evt == 'resize')) ? window : document;

            e.initEvent(evt, bub, can);
            obj.dispatchEvent(e);
        } else {
            for (var i = 0; i < this.length; i++) {
                e.initEvent(evt, bub, can);
                this[i].dispatchEvent(e);
            }
        }
        return this;
    }
});