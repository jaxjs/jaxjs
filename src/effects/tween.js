/**
 * effects/tween.js
 */
(function(window){
    /**
     * Create the tween object and functions under the main jax object.
     *
     * Tween object and functions, based on Robert Penner's base easing functions (http://www.robertpenner.com/easing/)
     * and George McGinley's extended easing functions (https://github.com/danro/jquery-easing/blob/master/jquery.easing.js)
     */
    window.jax.tween = {
        /** Function to calculate a linear tween step */
        linear : function(curStep, start, end, totalSteps) {
            return (end * (curStep / totalSteps)) + start;
        },
        /** Tween ease-in object */
        easein : {
            /** Function to calculate a quadratic easing-in tween step */
            quad  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep) + start;
            },
            /** Function to calculate a cubic easing-in tween step */
            cubic : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep * curStep) + start;
            },
            /** Function to calculate a quartic easing-in tween step */
            quart : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep * curStep * curStep) + start;
            },
            /** Function to calculate a quintic easing-in tween step */
            quint : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (end * curStep * curStep * curStep * curStep * curStep) + start;
            },
            /** Function to calculate a sinusoidal easing-in tween step */
            sine  : function(curStep, start, end, totalSteps) {
                return (-end * Math.cos(curStep / totalSteps * (Math.PI / 2))) + end + start;
            },
            /** Function to calculate an exponential easing-in tween step */
            expo  : function(curStep, start, end, totalSteps) {
                return (end * Math.pow(2, 10 * (curStep / totalSteps - 1))) + start;
            },
            /** Function to calculate a circular easing-in tween step */
            circ  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (-end * (Math.sqrt(1 - (curStep * curStep)) - 1)) + start;
            },
            /** Function to calculate an elastic easing-in tween step */
            elastic : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                var p = 0;
                var a = end;
                if (curStep == 0) return start;  if ((curStep /= totalSteps) == 1) return start + end;  if (!p) p = totalSteps * .3;
                if (a < Math.abs(end)) { a = end; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(end / a);
                return -(a * Math.pow(2, 10 * (curStep -= 1)) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p)) + start;
            },
            /** Function to calculate a back easing-in tween step */
            back : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                return end * (curStep /= totalSteps) * curStep *((s + 1) * curStep - s) + start;
            },
            /** Function to calculate a bounce easing-in tween step */
            bounce : function(curStep, start, end, totalSteps) {
                return end - window.jax.tween.easeout.bounce((totalSteps - curStep), 0, end, totalSteps) + start;
            }
        },
        /** Tween ease-out object */
        easeout : {
            /** Function to calculate a quadratic easing-out tween step */
            quad  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                return (-end * curStep * (curStep - 2)) + start;
            },
            /** Function to calculate a cubic easing-out tween step */
            cubic : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (end *(curStep * curStep * curStep + 1)) + start;
            },
            /** Function to calculate a quartic easing-out tween step */
            quart : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (-end * (curStep * curStep * curStep * curStep - 1)) + start;
            },
            /** Function to calculate a quintic easing-out tween step */
            quint : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (end * ((curStep * curStep * curStep * curStep * curStep) + 1)) + start;
            },
            /** Function to calculate a sinusoidal easing-out tween step */
            sine  : function(curStep, start, end, totalSteps) {
                return (end * Math.sin(curStep / totalSteps * (Math.PI / 2))) + start;
            },
            /** Function to calculate an exponential easing-out tween step */
            expo  : function(curStep, start, end, totalSteps) {
                return (end * (-Math.pow(2, -10 * curStep / totalSteps) + 1)) + start;
            },
            /** Function to calculate a circular easing-out tween step */
            circ  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps;
                curStep--;
                return (end * Math.sqrt(1 - (curStep * curStep))) + start;
            },
            /** Function to calculate an elastic easing-out tween step */
            elastic : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                var p = 0;
                var a = end;
                if (curStep == 0) return start;  if ((curStep /= totalSteps) == 1) return start + end;  if (!p) p = totalSteps * .3;
                if (a < Math.abs(end)) { a = end; var s = p / 4; }
                else var s = p / (2 * Math.PI) * Math.asin(end / a);
                return a * Math.pow(2, -10 * curStep) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p) + end + start;
            },
            /** Function to calculate a back easing-out tween step */
            back : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                return end * ((curStep = curStep / totalSteps - 1) * curStep * ((s + 1) * curStep + s) + 1) + start;
            },
            /** Function to calculate a bounce easing-out tween step */
            bounce : function(curStep, start, end, totalSteps) {
                if ((curStep /= totalSteps) < (1/2.75)) {
                    return end * (7.5625 * curStep * curStep) + start;
                } else if (curStep < (2 / 2.75)) {
                    return end * (7.5625 * (curStep -= (1.5/2.75)) * curStep + .75) + start;
                } else if (curStep < (2.5/2.75)) {
                    return end * (7.5625 * (curStep -= (2.25/2.75)) * curStep + .9375) + start;
                } else {
                    return end * (7.5625 * (curStep -= (2.625/2.75)) * curStep + .984375) + start;
                }
            }
        },
        /** Tween ease-in-out object */
        easeinout : {
            /** Function to calculate a quadratic easing-in-out tween step */
            quad  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep) + start;
                curStep--;
                return (-end / 2 * (curStep * (curStep - 2) - 1)) + start;
            },
            /** Function to calculate a cubic easing-in-out tween step */
            cubic : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep * curStep) + start;
                curStep -= 2;
                return ((end / 2) * (curStep * curStep * curStep + 2)) + start;
            },
            /** Function to calculate a quartic easing-in-out tween step */
            quart : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep * curStep * curStep) + start;
                curStep -= 2;
                return ((-end / 2) * (curStep * curStep * curStep * curStep - 2)) + start;
            },
            /** Function to calculate a quintic easing-in-out tween step */
            quint : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * curStep * curStep * curStep * curStep * curStep) + start;
                curStep -= 2;
                return ((end / 2) * ((curStep * curStep * curStep * curStep * curStep) + 2)) + start;
            },
            /** Function to calculate a sinusoidal easing-in-out tween step */
            sine  : function(curStep, start, end, totalSteps) {
                return ((-end / 2) * (Math.cos(Math.PI * curStep / totalSteps) - 1)) + start;
            },
            /** Function to calculate an exponential easing-in-out tween step */
            expo  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((end / 2) * Math.pow(2, 10 * (curStep - 1))) + start;
                curStep--;
                return ((end / 2) * (-Math.pow(2, -10 * curStep) + 2)) + start;
            },
            /** Function to calculate a circular easing-in-out tween step */
            circ  : function(curStep, start, end, totalSteps) {
                curStep /= totalSteps / 2;
                if (curStep < 1) return ((-end / 2) * (Math.sqrt(1 - (curStep * curStep)) - 1)) + start;
                curStep -= 2;
                return ((end / 2) * (Math.sqrt(1 - (curStep * curStep)) + 1)) + start;
            },
            /** Function to calculate an elastic easing-in-out tween step */
            elastic  : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                var p = 0;
                var a = end;
                if (curStep == 0) return start;  if ((curStep /= totalSteps / 2) == 2) return start + end;  if (!p) p = totalSteps * (.3 * 1.5);
                if (a < Math.abs(end)) { a = end; var s = p/4; }
                else var s = p / (2 * Math.PI) * Math.asin(end / a);
                if (curStep < 1) return -.5 * (a * Math.pow(2, 10 * (curStep -= 1)) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p)) + start;
                return a * Math.pow(2, -10 * (curStep -= 1)) * Math.sin((curStep * totalSteps - s) * (2 * Math.PI) / p) * .5 + end + start;
            },
            /** Function to calculate a back easing-in-out tween step */
            back : function(curStep, start, end, totalSteps) {
                var s = 1.70158;
                if ((curStep /= totalSteps / 2) < 1) return end / 2 * (curStep * curStep * (((s *= (1.525)) + 1) * curStep - s)) + start;
                return end / 2 * ((curStep -= 2) * curStep * (((s *= (1.525)) + 1) * curStep + s) + 2) + start;
            },
            /** Function to calculate a bounce easing-in-out tween step */
            bounce : function(curStep, start, end, totalSteps) {
                if (curStep < totalSteps / 2) return window.jax.tween.easeout.bounce((curStep * 2), 0, end, totalSteps) * .5 + start;
                return window.jax.tween.easeout.bounce(((curStep * 2) - totalSteps), 0, end, totalSteps) * .5 + end * .5 + start;
            }
        }
    };
})(window);
