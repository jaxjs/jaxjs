/**
 * css/dimensions.js
 */
jax.extend({
    /**
     * Function to get the height of either an object or the viewport directly.
     *
     * @param  {String|Number} hgt
     * @return {Number}
     */
    height : function(hgt) {
        if (this[0] != undefined) {
            if (hgt != null) {
                this.css('height', hgt);
            }
            var h =  parseInt(this.css('height'));
            return ((!isNaN(h)) ? h : 0);
        } else {
            return parseInt(this.view.height);
        }
    },
    /**
     * Function to get the inner height of either an object (no padding.)
     *
     * @return {Number}
     */
    innerHeight : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var h  = parseInt(this.css('height'));
        var pt = parseInt(this.css('padding-top'));
        var pb = parseInt(this.css('padding-bottom'));

        return (((!isNaN(h)) ? h : 0) -
            ((!isNaN(pt)) ? pt : 0) -
            ((!isNaN(pb)) ? pb : 0));
    },
    /**
     * Function to get the outer height of either an object (margin included.)
     *
     * @return {Number}
     */
    outerHeight : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var mt  = parseInt(this.css('margin-top'));
        var btw = parseInt(this.css('border-top-width'));
        var h   = parseInt(this.css('height'));
        var bbw = parseInt(this.css('border-bottom-width'));
        var mb  = parseInt(this.css('margin-bottom'));

        return (((!isNaN(mt)) ? mt : 0) +
            ((!isNaN(btw)) ? btw : 0) +
            ((!isNaN(h)) ? h : 0) +
            ((!isNaN(bbw)) ? bbw : 0) +
            ((!isNaN(mb)) ? mb : 0));
    },
    /**
     * Function to get the width of either an object or the viewport directly.
     *
     * @param  {String|Number} hgt
     * @return {Number}
     */
    width : function(wid) {
        if (this[0] != undefined) {
            if (wid != null) {
                this.css('width', wid);
            }
            var w =  parseInt(this.css('width'));
            return ((!isNaN(w)) ? w : 0);
        } else {
            return parseInt(this.view.width);
        }
    },
    /**
     * Function to get the inner width of either an object (no padding.)
     *
     * @return {Number}
     */
    innerWidth : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var w  = parseInt(this.css('width'));
        var pl = parseInt(this.css('padding-left'));
        var pr = parseInt(this.css('padding-right'));

        return (((!isNaN(w)) ? w : 0) -
            ((!isNaN(pl)) ? pl : 0) -
            ((!isNaN(pr)) ? pr : 0));
    },
    /**
     * Function to get the outer width of either an object (margin included.)
     *
     * @return {Number}
     */
    outerWidth : function() {
        if (this[0] == undefined) {
            throw 'An object must be selected.';
        }

        var blw = parseInt(this.css('border-left-width'));
        var ml  = parseInt(this.css('margin-left'));
        var w   = parseInt(this.css('width'));
        var brw = parseInt(this.css('border-right-width'));
        var mr  = parseInt(this.css('margin-right'));

        return (((!isNaN(blw)) ? blw : 0) +
            ((!isNaN(ml)) ? ml : 0) +
            ((!isNaN(w)) ? w : 0) +
            ((!isNaN(brw)) ? brw : 0) +
            ((!isNaN(mr)) ? mr : 0));
    }
});