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
        var sty           = null;
        var opac          = false;
        var formattedProp = null;
        var bgPos         = null;

        if (this[0] != undefined) {
            switch(props) {
                // Handle opacity
                case 'opacity':
                    formattedProp = 'opacity';
                    opac          = true;
                    break;
                // Handle cssFloat
                case 'float':
                    formattedProp = 'cssFloat';
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

            if ((formattedProp == 'backgroundPositionX') || (formattedProp == 'backgroundPositionY')) {
                bgPos         = (formattedProp == 'backgroundPositionX') ? 'x' : 'y';
                formattedProp = 'backgroundPosition';
            }
            if ((props == 'background-position-x') || (props == 'background-position-y')) {
                bgPos = (props == 'background-position-x') ? 'x' : 'y';
                props = 'background-position';
            }

            // Attempt to get the style if assigned via JavaScript, else attempt to get the style is computed/rendered via CSS.
            var assignedStyle = eval("this[0].style." + formattedProp + ";");
            var computedStyle = (window.getComputedStyle) ? window.getComputedStyle(this[0], null).getPropertyValue(props) :
                eval('this[0].currentStyle.' + formattedProp);
            sty = (assignedStyle != '') ? assignedStyle : computedStyle;
            if (sty == '0%') {
                sty = '0px';
            }

            if (opac) {
                sty = Math.round(sty * 100);
                if (sty.toString() == '') {
                    sty = (window.jax(this[0]).css('display') != 'none') ? 100 : 0;
                }
            }

            if ((bgPos != null) && (sty.indexOf(' ') != -1)) {
                var styAry = sty.split(' ');
                sty = (bgPos == 'x') ? styAry[0] : styAry[1];
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