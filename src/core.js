/**
 * jax javascript library (http://www.jaxjs.org/)
 *
 * @link       https://github.com/jaxjs/jaxjs
 * @category   jax
 * @author     Nick Sagona, III <dev@nolainteractive.com>
 * @copyright  Copyright (c) 2009-2016 NOLA Interactive, LLC. (http://www.nolainteractive.com)
 * @license    http://www.jaxjs.org/license     New BSD License
 * @version    [{version}]
 * @build      [{build}]
 */
(function(window){
    window.jax = {
        version : '[{version}]'  
    };
    window.jax.rand = null;

    /** Function to generate a unique random number */
    window.jax.random = function(num1, num2) {
        var range;
        var rand;

        if ((num1 < 0) && (num2 < 0)) {
            range = Math.abs(num1 - num2);
        } else if ((num1 < 0) && (num2 >= 0)) {
            range = Math.abs(num2 - num1);
        } else {
            range = num2 - num1;
        }

        if ((window.jax.rand == undefined) || (window.jax.rand.length > range)) {
            window.jax.rand = [];
        }

        rand = Math.floor(Math.random() * (range + 1)) + num1;
        while (window.jax.rand.indexOf(rand) != -1) {
            rand = Math.floor(Math.random() * (range + 1)) + num1;
        }

        window.jax.rand.push(rand);
        return rand;
    };

    /** Function to get a variable or variables from the query string */
    window.jax.query = function(key, u) {
        var vars = [];
        var url = (u != null) ? u : location.href;

        if (url.indexOf('?') != -1) {
            var varString = url.substring(url.indexOf('?') + 1);
            if (varString.indexOf('#') != -1) {
                varString = varString.substring(0, varString.indexOf('#'));
            }
            var varsAry = varString.split('&');
            for (var i = 0; i < varsAry.length; i++) {
                var gV = varsAry[i].split('=');
                vars[gV[0]] = decodeURIComponent(gV[1]);
            }
        }

        // If key was passed
        if ((key != undefined) && (key != null)) {
            return (vars[key] != undefined) ? vars[key] : undefined;
            // Else, return entire array
        } else {
            return vars;
        }
    };

    /** Function to return the target identifier of the document's URI */
    window.jax.target = function(u) {
        var url = (u != null) ? u : location.href;
        var target = null;
        if (url.indexOf('#') != -1) {
            target = url.substring(url.indexOf('#') + 1);
        }
        return target;
    };

    /** Function to fire before window is unloaded */
    window.jax.beforeunload = function(func) {
        // Get old beforeunload function(s), if they exist.
        var oldBeforeUnLoad = window.onbeforeunload;

        if (typeof window.onbeforeunload != 'function') {
            window.onbeforeunload = func;
        } else {
            window.onbeforeunload = function() {
                if (oldBeforeUnLoad) {
                    oldBeforeUnLoad();
                }
                func();
            };
        }
    };
})(window);
