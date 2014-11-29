/**
 * effects/animate.js
 */
(function(window){
    window.jax.instances = [];
})(window);

jax.extend({
    /**
     * Function to calculate and perform the animation or animations
     *
     * @param   {Array}  params
     * @param   {Object} opts
     * @returns {jax}
     */
    animate : function(params, opts) {
        var tween    = ((opts != undefined) && (opts.tween != undefined))    ? opts.tween : 25;
        var speed    = ((opts != undefined) && (opts.speed != undefined))    ? Math.round(opts.speed / tween) : 20;
        var trace    = ((opts != undefined) && (opts.trace != undefined))    ? opts.trace : null;
        var complete = ((opts != undefined) && (opts.complete != undefined)) ? opts.complete : null;
        var easingX  = null;
        var easingY  = null;

        if ((opts != undefined) && (opts.easing != undefined)) {
            easingX = opts.easing;
        }
        if ((opts != undefined) && (opts.easingX != undefined)) {
            easingX = opts.easingX;
        }
        if ((opts != undefined) && (opts.easingY != undefined)) {
            easingY = opts.easingY;
        }

        // If elements have already been selected, use them as the overriding elements
        if (this.length > 0) {
            var realParams = [];
            for (var i = 0; i < this.length; i++) {
                realParams.push([this[i], params]);
            }
            params = realParams;
        }

        var elems = [];
        // Iterate through the params passed.
        for (var e = 0; e < params.length; e++) {
            var fadeChange   = null;
            var widthChange  = null;
            var heightChange = null;
            var steps        = null;
            var elemSteps    = [];
            var elem         = params[e][0];

            // Convert into an array if not one already
            if ((params[e][1].constructor == Array) && (params[e][1][0].constructor != Array)) {
                params[e][1] = [params[e][1]];
            }

            // Iterate through the animation parameters of the elements passed.
            for (var m = 0; m < params[e][1].length; m++) {
                var type = params[e][1][m][0];
                switch (type) {
                    case 'move':
                        steps = this.calcSteps(
                            params[e][1][m][1].x,
                            params[e][1][m][1].y,
                            parseInt(window.jax(elem).css('left')),
                            parseInt(window.jax(elem).css('top')), tween, easingX,  easingY
                        );
                        break;
                    case 'slide':
                        var backPos = window.jax(elem).css('background-position');
                        if ((backPos != null) && (backPos.toString().indexOf('px') != -1)) {
                            backPos = backPos.split(' ');
                            var orgX = parseInt(backPos[0]);
                            var orgY = parseInt(backPos[1]);
                        } else {
                            var orgX = 0;
                            var orgY = 0;
                        }
                        steps = this.calcSteps(params[e][1][m][1].x, params[e][1][m][1].y, orgX, orgY, tween, easingX,  easingY);
                        break;
                    case 'resize':
                        steps = this.calcSteps(
                            params[e][1][m][1].w,
                            params[e][1][m][1].h,
                            parseInt(window.jax(elem).innerWidth()),
                            parseInt(window.jax(elem).innerHeight()),
                            tween, easingX,  easingY
                        );
                        break;
                    case 'fade':
                        var curOpacity = window.jax(elem).css('opacity');
                        fadeChange = params[e][1][m][1].o;
                        if (fadeChange != 0) {
                            window.jax(elem).show();
                        }
                        steps = this.calcSteps(curOpacity, null, params[e][1][m][1].o, null, tween, easingX);
                        break;
                    case 'wipeOff':
                        widthChange = params[e][1][m][1].w;
                        if (widthChange != 0) {
                            window.jax(elem).show();
                        }
                        steps = this.calcSteps(parseInt(window.jax(elem).innerWidth()), null, params[e][1][m][1].w, null, tween, easingX);
                        break;
                    case 'wipeUp':
                        heightChange = params[e][1][m][1].h;
                        if (heightChange != 0) {
                            window.jax(elem).show();
                        }
                        steps = this.calcSteps(parseInt(window.jax(elem).innerHeight()), null, params[e][1][m][1].h, null, tween, easingX);
                        break;
                    case 'scrollX':
                        var curX = (window.jax.isWindow(elem)) ? window.jax().getScrollX() : window.jax(elem).getScrollX();
                        steps = this.calcSteps(curX, null, params[e][1][m][1].x, null, tween, easingX);
                        break;
                    case 'scrollY':
                        var curY = (window.jax.isWindow(elem)) ? window.jax().getScrollY() : window.jax(elem).getScrollY();
                        steps = this.calcSteps(curY, null, params[e][1][m][1].y, null, tween, easingX);
                        break;
                    case 'blendColor':
                    case 'blendBgColor':
                        var blend = window.jax.color(params[e][1][m][1].c1).blend(params[e][1][m][1].c2, tween, easingX);
                        steps = [];
                        for (var w = 0; w < blend.length; w++) {
                            steps.push(blend[w].rgba);
                        }
                        break;
                }
                elemSteps.push([type, steps]);
            }
            elems.push([elem, elemSteps, [fadeChange, widthChange, heightChange]]);
        }

        var animateObj = function(elms, spd, c, i, trace) {
            if (i == null) {
                i = window.jax.random(100000, 999999);
            }
            if ((elms[0] != undefined) && (c < elms[0][1][0][1].length)) {
                for (var q = 0; q < elms.length; q++) {
                    for (var n = 0; n < elms[q][1].length; n++) {
                        var e = elms[q][0];
                        switch(elms[q][1][n][0]) {
                            case 'move':
                                var x = elms[q][1][n][1][c][0];
                                var y = elms[q][1][n][1][c][1];
                                window.jax(e).css('left', x + 'px');
                                window.jax(e).css('top', y + 'px');
                                break;
                            case 'resize':
                                var x = elms[q][1][n][1][c][0];
                                var y = elms[q][1][n][1][c][1];
                                window.jax(e).css('width', x + 'px');
                                window.jax(e).css('height', y + 'px');
                                break;
                            case 'fade':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('opacity', x);
                                break;
                            case 'wipeOff':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('width', x + 'px');
                                break;
                            case 'wipeUp':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('height', x + 'px');
                                break;
                            case 'scrollX':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                if (window.jax.isWindow(elem)) {
                                    elem.scrollTo(x, 0);
                                } else {
                                    window.jax(e)[0].scrollLeft = x;
                                }
                                break;
                            case 'scrollY':
                                var x = null;
                                var y = elms[q][1][n][1][c];
                                if (window.jax.isWindow(elem)) {
                                    elem.scrollTo(0, y);
                                } else {
                                    window.jax(e)[0].scrollTop = y;
                                }
                                break;
                            case 'slide':
                                var x = elms[q][1][n][1][c][0];
                                var y = elms[q][1][n][1][c][1];
                                window.jax(e).css('background-position', x + 'px ' + y + 'px');
                                break;
                            case 'blendColor':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('color', x);
                                break;
                            case 'blendBgColor':
                                var x = elms[q][1][n][1][c];
                                var y = null;
                                window.jax(e).css('background-color', x);
                                break;
                        }
                        if (trace != null) {
                            trace.apply(undefined, [{"obj" : e, "x" : x, "y" : y, "i" : c}]);
                        }
                    }
                }
                c++;
                window.jax.instances[i] = setTimeout(function() { animateObj(elms, spd, c, i, trace); }, spd);
            } else {
                for (var q = 0; q < elms.length; q++) {
                    var e = elms[q][0];
                    if (elms[q][2][0] != null) {
                        if (elms[q][2][0] == 0) {
                            window.jax(e).hide();
                        }
                        window.jax(e).css('opacity', elms[q][2][0]);
                    } else if (elms[q][2][1] != null) {
                        if (elms[q][2][1] == 0) {
                            window.jax(e).hide();
                        }
                        window.jax(e).css('width', elms[q][2][1] + 'px');
                    } else if (elms[q][2][2] != null) {
                        if (elms[q][2][2] == 0) {
                            window.jax(e).hide();
                        }
                        window.jax(e).css('height', elms[q][2][2] + 'px');
                    }
                }

                if (complete != null) {
                    complete();
                }

                window.jax.instances[i] = clearTimeout(window.jax.instances[i]);
                window.jax.instances[i] = undefined;
                delete window.jax.instances[i];
            }
        };

        animateObj(elems, speed, 0, null, trace);
        return this;
    },
    /**
     * Function to calculate the in between steps of the animations
     *
     * @param   {Mixed}    a
     * @param   {Mixed}    b
     * @param   {Mixed}    c
     * @param   {Mixed}    d
     * @param   {Number}   tween
     * @param   {Function} easingX
     * @param   {Function} easingY
     * @returns {Array}
     */
    calcSteps : function(a, b, c, d, tween, easingX,  easingY) {
        // Reset the array.
        var steps = [];

        // Make sure the values are numbers, calculate any increment notation
        if ((typeof c == 'string') && ((c.indexOf('+=') != -1) || (c.indexOf('-=') != -1))) {
            a = parseFloat(a);
            var inc = c;
            c = a;
            eval('c ' + inc);
        } else {
            c = parseFloat(c);
            if ((typeof a == 'string') && ((a.indexOf('+=') != -1) || (a.indexOf('-=') != -1))) {
                var inc = a;
                a = c;
                eval('a ' + inc);
            } else {
                a = parseFloat(a);
            }
        }

        tween = parseFloat(tween);

        // Calculate the total "distance" from point a to point b
        var aTotal = c - a;
        var bTotal = null;

        if ((b != null) && (d != null)) {
            // Make sure the values are numbers, calculate any increment notation
            d = parseFloat(d);
            if ((typeof b == 'string') && ((b.indexOf('+=') != -1) || (b.indexOf('-=') != -1))) {
                var inc = b;
                b = d;
                eval('b ' + inc);
            } else {
                b = parseFloat(b);
            }
            bTotal = d - b;
        }

        if ((easingX == undefined) || (easingX == null) || (typeof easingX != 'function')) {
            easingX = window.jax.tween.linear;
        }
        if ((easingY == undefined) || (easingY == null) || (typeof easingY != 'function')) {
            easingY = easingX;
        }

        // Calculate the steps
        for (var i = 0; i <= tween; i++) {
            var curA = Math.round(easingX(i, a, aTotal, tween));
            if (bTotal != null) {
                var curB = Math.round(easingY(i, b, bTotal, tween));
            }

            if (bTotal != null) {
                steps.unshift([curA, curB]);
            } else {
                steps.push(curA);
            }
        }

        return steps;
    }
});