/**
 * css/set.js
 */
jax.extend({
    /**
     * Function to set the CSS properties of the object passed.
     *
     * @param {Object} obj
     * @param {Mixed}  props
     * @param {Mixed}  val
     */
    setCss : function(obj, props, val) {
        if ((props.constructor == String) && (val != null)) {
            var properties = {};
            properties[props] = val;
        } else {
            var properties = props;
        }

        for (var prop in properties) {
            switch(prop) {
                // Handle opacity
                case 'opacity':
                    obj.style.opacity = properties[prop] / 100;
                    break;
                // Handle cssFloat
                case 'float':
                    obj.style.cssFloat = properties[prop];
                    break;
                // Handle all other CSS properties.
                default:
                    // Create properly formatted property, converting a dashed property to a camelCase property if applicable.
                    if (prop.indexOf('-') != -1) {
                        var propAry = prop.split('-');
                        var prp = propAry[0].toLowerCase();
                        for (var i = 1; i < propAry.length; i++) {
                            prp = prp + propAry[i].substring(0, 1).toUpperCase() + propAry[i].substring(1);
                        }
                    } else {
                        var prp = prop;
                    }

                    if ((prp == 'backgroundPositionX') || (prp == 'backgroundPositionY')) {
                        var bgPos = this.css('background-position');
                        if (bgPos.indexOf(' ') != -1) {
                            var bgPosAry = bgPos.split(' ');
                            if (prp == 'backgroundPositionX') {
                                eval("obj.style.backgroundPosition = '" + properties[prop] + " " + bgPosAry[1] + "';");
                            } else {
                                eval("obj.style.backgroundPosition = '" + bgPosAry[0] + " " + properties[prop] + "';");
                            }
                        }
                    } else {
                        eval("obj.style." + prp + " = '" + properties[prop] + "';");
                    }
            }
        }
    }
});