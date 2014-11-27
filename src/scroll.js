/**
 * scroll.js
 */
jax.extend({
    /**
     * Function to retrieve the current scroll X-position, either relative to the screen or an element
     *
     * @returns {Number}
     */
    getScrollX : function() {
        var xPos = 0;
        if (this[0] != undefined) {
            xPos = this[0].scrollLeft;
        } else {
            if (window.jax.browser.msie) {
                xPos = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
            } else {
                xPos = window.scrollX;
            }
        }
        return xPos;
    },
    /**
     * Function to retrieve the current scroll Y-position, either relative to the screen or an element
     *
     * @returns {Number}
     */
    getScrollY : function() {
        var yPos = 0;
        if (this[0] != undefined) {
            yPos = this[0].scrollTop;
        } else {
            if (window.jax.browser.msie) {
                yPos = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
            } else {
                yPos = window.scrollY;
            }
        }
        return yPos;
    },
    /**
     * Function to retrieve the scrollable width of the element
     *
     * @returns {Number}
     */
    getScrollWidth : function() {
        var wid = 0;
        if (this[0] != undefined) {
            wid = this[0].scrollWidth;
        } else {
            if (window.jax.browser.msie) {
                wid = (document.documentElement.scrollWidth) ? document.documentElement.scrollWidth : document.body.scrollWidth;
            } else {
                wid = document.body.scrollWidth;
            }
        }
        return wid;
    },
    /**
     * Function to retrieve the scrollable height of the element
     *
     * @returns {Number}
     */
    getScrollHeight : function() {
        var hgt = 0;
        if (this[0] != undefined) {
            hgt = this[0].scrollHeight;
        } else {
            if (window.jax.browser.msie) {
                hgt = (document.documentElement.scrollHeight) ? document.documentElement.scrollHeight : document.body.scrollHeight;
            } else {
                hgt = document.body.scrollHeight;
            }
        }
        return hgt;
    }
});