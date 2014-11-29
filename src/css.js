/**
 * css.js
 */
jax.extend({
    /** Function to determine whether or not current object is hidden */
    isHidden : function() {
        return (this[0] != null) ? (this[0].style.display == 'none') : -1;
    },
    /** Function to see if an element is within the view port */
    inView : function() {
        if (this[0] != undefined) {
            var wid = this.width();
            var hgt = this.height();

            if (((document.documentElement) && (document.documentElement.scrollLeft)) || (document.body.scrollLeft)) {
                var xPos = (document.documentElement.scrollLeft) ? document.documentElement.scrollLeft : document.body.scrollLeft;
                var yPos = (document.documentElement.scrollTop) ? document.documentElement.scrollTop : document.body.scrollTop;
            } else {
                var xPos = window.scrollX;
                var yPos = window.scrollY;
            }

            return (
                ((this.view.height + yPos) > this[0].offsetTop) && ((hgt + this[0].offsetTop) > yPos) &&
                    ((this.view.width + xPos) > this[0].offsetLeft) && ((wid + this[0].offsetLeft) > xPos)
                );
        }
    },
    /**
     * Function to get or set CSS properties
     *
     * @param  {Mixed} props
     * @param  {Mixed} val
     * @return {Mixed}
     */
    css : function(props, val) {
        // Get the CSS value
        if ((props.constructor == String) && (val == null)) {
            return this.getCss(props);
            // Else, set the CSS values
        } else {
            for (var i = 0; i < this.length; i++) {
                this.setCss(this[i], props, val);
            }
            return this;
        }
    }
});