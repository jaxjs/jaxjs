/**
 * css/get.js
 */
jax.extend({
    /**
     * Function to get value of CSS property passed.
     *
     * @param  {Mixed} props
     * @return {Mixed}
     */
    getCss : function(props) {
        var sty = null;
        var styY = null;
        var opac = false;
        var formattedProp = null;
        var formattedPropY = null;

        if (this[0] != undefined) {
            switch(props) {
                // Handle the opacity/filter issue.
                case 'opacity':
                    formattedProp = ((window.jax.browser.msie) && (parseInt(window.jax.browser.version) < 10)) ? 'filter' : 'opacity';
                    opac = true;
                    break;
                // Handle the styleFloat/cssFloat issue.
                case 'float':
                    formattedProp = (window.jax.browser.msie) ? 'styleFloat' : 'cssFloat';
                    break;
                // Handle the backgroundPosition issue.
                case 'background-position':
                    if (window.jax.browser.msie) {
                        formattedProp  = 'backgroundPositionX';
                        formattedPropY = 'backgroundPositionY';
                    } else {
                        formattedProp  = 'backgroundPosition';
                    }
                    break;
                // Handle all other CSS properties.
                default:
                    // Create properly formatted property, converting a dashed property to a camelCase property if applicable.
                    if (props.indexOf('-') != -1) {
                        var propAry = props.split('-');
                        formattedProp = propAry[0].toLowerCase()
                        for (var i = 1; i < propAry.length; i++) {
                            formattedProp += propAry[i].substring(0, 1).toUpperCase() + propAry[i].substring(1);
                        }
                    } else {
                        formattedProp = props;
                    }
            }

            // Attempt to get the style if assigned via JavaScript, else attempt to get the style is computed/rendered via CSS.
            var assignedStyle = eval("this[0].style." + formattedProp + ";");
            var computedStyle = (window.jax.browser.msie) ? eval('this[0].currentStyle.' + formattedProp) : window.getComputedStyle(this[0], null).getPropertyValue(props);
            sty = (assignedStyle != '') ? assignedStyle : computedStyle;
            if (sty == '0%') {
                sty = '0px';
            }

            // If there's a formattedPropY value
            if (formattedPropY != null) {
                var assignedStyleY = eval("this[0].style." + formattedPropY + ";");
                var computedStyleY = (window.jax.browser.msie) ? eval('this[0].currentStyle.' + formattedPropY) : window.getComputedStyle(this[0], null).getPropertyValue(props);
                styY = (assignedStyleY != '') ? assignedStyleY : computedStyleY;
                if (styY == '0%') {
                    styY = '0px';
                }
                sty += ' ' + styY;
            }

            if (opac) {
                if ((window.jax.browser.msie) && (parseInt(window.jax.browser.version) < 10)) {
                    sty = sty.substring((sty.indexOf('=') + 1));
                    sty = sty.substring(0, sty.indexOf(')'));
                } else {
                    sty = Math.round(sty * 100);
                }
                if (sty.toString() == '') {
                    sty = (window.jax(this[0]).css('display') != 'none') ? 100 : 0;
                }
            }

            if ((sty == undefined) || (sty == 'auto') || ((sty.constructor == String) && (sty.indexOf('%') != -1))) {
                if (props == 'width') {
                    sty = this[0].offsetWidth;
                } else if (props == 'height') {
                    sty = this[0].offsetHeight;
                }
            }

            if ((sty != undefined) && (sty.constructor == String)) {
                var pxCount = sty.match(/px/g);
                if ((pxCount != null) && (pxCount.length <= 1)) {
                    sty = parseFloat(sty);
                }
            }

            if (props == 'width') {
                sty += this.css('padding-left');
                sty += this.css('padding-right');
            } else if (props == 'height') {
                sty += this.css('padding-top');
                sty += this.css('padding-bottom');
            }
        }

        return sty;
    }
});