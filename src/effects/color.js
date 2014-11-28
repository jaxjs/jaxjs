/**
 * effects/color.js
 */
jax.extend({
    /**
     * Alias function to animate selected elements via 'blendColor'
     *
     * @param   {Mixed}  c1
     * @param   {Mixed}  c2
     * @param   {Object} opts
     * @returns {jax}
     */
    blendColor : function(c1, c2, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['blendColor', {"c1" : c1, "c2" : c2}], opts);}, this.delayTime);
            } else {
                this.animate(['blendColor', {"c1" : c1, "c2" : c2}], opts);
            }
        }
        return this;
    },
    /**
     * Alias function to animate selected elements via 'blendBgColor'
     *
     * @param   {Mixed}  c1
     * @param   {Mixed}  c2
     * @param   {Object} opts
     * @returns {jax}
     */
    blendBgColor : function(c1, c2, opts) {
        if (this.length > 0) {
            if (this.delayTime > 0) {
                var self = this;
                var tO = setTimeout(function() {self.animate(['blendBgColor', {"c1" : c1, "c2" : c2}], opts);}, this.delayTime);
            } else {
                this.animate(['blendBgColor', {"c1" : c1, "c2" : c2}], opts);
            }
        }
        return this;
    }
});

(function(window){
    /** Object for manipulation and calculation of color conversions and blends */
    var color = {
        color : null,
        rgb   : null,
        hex   : null,
        /**
         * Init/constructor function for the color object
         *
         * @param   {Mixed}  color
         * @returns {Object}
         */
        init  : function(color) {
            this.color = color;
            if (this.color.indexOf('rgb') != -1) {
                this.color = this.color.substring(this.color.indexOf('(') + 1);
                this.color = this.color.substring(0, this.color.indexOf(')'));
                this.rgb = this.color.replace(/, /g, ',').split(',');
                if (this.rgb[3] == undefined) {
                    this.rgb.push(1.0);
                }

                var rHex = parseInt(this.rgb[0]).toString(16);
                var gHex = parseInt(this.rgb[1]).toString(16);
                var bHex = parseInt(this.rgb[2]).toString(16);

                if (rHex.length == 1) {
                    rHex = '0' + rHex;
                }
                if (gHex.length == 1) {
                    gHex = '0' + gHex;
                }
                if (bHex.length == 1) {
                    bHex = '0' + bHex;
                }
                this.hex = [rHex, gHex, bHex];
            } else {
                if (this.color.substring(0, 1) == '#') {
                    this.color = this.color.substring(1);
                }
                if (this.color.length == 3) {
                    this.hex = [
                        this.color.substring(0, 1).toString() + this.color.substring(0, 1).toString(),
                        this.color.substring(1, 2).toString() + this.color.substring(1, 2).toString(),
                        this.color.substring(2).toString() + this.color.substring(2).toString()
                    ]
                } else {
                    this.hex = [this.color.substring(0, 2), this.color.substring(2, 4), this.color.substring(4)];
                }
                this.rgb = [
                    parseInt(this.hex[0], 16),
                    parseInt(this.hex[1], 16),
                    parseInt(this.hex[2], 16),
                    1.0
                ];
            }

            return this;
        },
        /**
         * Function to get the hex value as string
         *
         * @returns {String}
         */
        toHex : function() {
            return '#' + this.hex[0] + this.hex[1] + this.hex[2];
        },
        /**
         * Function to get the hex R value
         *
         * @returns {String}
         */
        hexR : function() {
            return this.hex[0];
        },
        /**
         * Function to get the hex G value
         *
         * @returns {String}
         */
        hexG : function() {
            return this.hex[1];
        },
        /**
         * Function to get the hex B value
         *
         * @returns {String}
         */
        hexB : function() {
            return this.hex[2];
        },
        /**
         * Function to get the rgb value as string
         *
         * @returns {String}
         */
        toRgb : function() {
            return 'rgb(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ')';
        },
        /**
         * Function to get the rgba value as string
         *
         * @returns {String}
         */
        toRgbA : function() {
            return 'rgba(' + this.rgb[0] + ', ' + this.rgb[1] + ', ' + this.rgb[2] + ', ' + this.rgb[3] + ')';
        },
        /**
         * Function to get the R value
         *
         * @returns {String}
         */
        r : function() {
            return this.rgb[0];
        },
        /**
         * Function to get the G value
         *
         * @returns {String}
         */
        g : function() {
            return this.rgb[1];
        },
        /**
         * Function to get the B value
         *
         * @returns {String}
         */
        b : function() {
            return this.rgb[2];
        },
        /**
         * Function to get the A value
         *
         * @returns {String}
         */
        a : function() {
            return this.rgb[3];
        },
        /**
         * Function to create an array of colors that represent a blend between two colors
         *
         * @param   {Mixed}    color
         * @param   {Number}   tween
         * @param   {Function} easing
         * @returns {Array}
         */
        blend : function(color, tween, easing) {
            var blend = [];
            var r1 = parseInt(this.rgb[0]);
            var g1 = parseInt(this.rgb[1]);
            var b1 = parseInt(this.rgb[2]);
            var a1 = parseFloat(this.rgb[3]);

            var color2 = window.jax.color(color);
            var r2 = parseInt(color2.rgb[0]);
            var g2 = parseInt(color2.rgb[1]);
            var b2 = parseInt(color2.rgb[2]);
            var a2 = parseFloat(color2.rgb[3]);

            if ((easing == undefined) || (easing == null) || (typeof easing != 'function')) {
                easing = window.jax.tween.linear;
            }

            // Calculate the total "distance" from point a to point b
            var rTotal = r2 - r1;
            var gTotal = g2 - g1;
            var bTotal = b2 - b1;
            var aTotal = a2 - a1;

            // Calculate the steps
            for (var i = 0; i <= tween; i++) {
                var curR = Math.round(easing(i, r1, rTotal, tween));
                var curG = Math.round(easing(i, g1, gTotal, tween));
                var curB = Math.round(easing(i, b1, bTotal, tween));
                var curA = Math.round(easing(i, a1, aTotal, tween));

                var rHex = parseInt(r2).toString(16);
                var gHex = parseInt(g2).toString(16);
                var bHex = parseInt(b2).toString(16);
                if (rHex.length == 1) {
                    rHex = '0' + rHex;
                }
                if (gHex.length == 1) {
                    gHex = '0' + gHex;
                }
                if (bHex.length == 1) {
                    bHex = '0' + bHex;
                }

                blend.push({
                    "rgb"  : 'rgb(' + curR + ', ' + curG + ', ' + curB + ')',
                    "rgba" : 'rgba(' + curR + ', ' + curG + ', ' + curB + ', ' + curA + ')',
                    "hex"  : '#' + rHex + gHex + bHex
                });
            }

            return blend;
        }
    };

    /**
     * Color object factory
     *
     * @param   {Mixed} c
     * @returns {Object}
     */
    window.jax.color = function(c) {
        return color.init(c);
    };
})(window);