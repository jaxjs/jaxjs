/**
 * core/misc.js
 */
(function(window){
    /** Is value defined function */
    window.jax.isDefined = function(value) {
        return typeof value != 'undefined';
    };

    /** Is value undefined function */
    window.jax.isUndefined = function(value) {
        return typeof value == 'undefined';
    };

    /** Is value not null function */
    window.jax.isNotNull = function(value) {
        return value != null;
    };

    /** Is value null function */
    window.jax.isNull = function(value) {
        return value == null;
    };

    /** Is value boolean function */
    window.jax.isBoolean = function(value) {
        return typeof value == 'boolean';
    };

    /** Is value string function */
    window.jax.isString = function(value) {
        return typeof value == 'string';
    };

    /** Is value number function */
    window.jax.isNumber = function(value) {
        return typeof value == 'number';
    };

    /** Is value array function */
    window.jax.isArray = function(value) {
        return value.constructor == Array;
    };

    /** Is value date function */
    window.jax.isDate = function(value) {
        return value.constructor == Date;
    };

    /** Is value object function */
    window.jax.isObject = function(value) {
        return value.constructor == Object;
    };

    /** Is value function function */
    window.jax.isFunction = function(value) {
        return typeof value == 'function';
    };

    /** Is value window function */
    window.jax.isWindow = function(value) {
        return ((value != undefined) && (value.document != undefined) && (value.location  != undefined));
    };

    /** Is value element function */
    window.jax.isElement = function(value) {
        return ((value != undefined) && (value.nodeName != undefined));
    };

    /**
     * Function to generate a random number between two numbers
     *
     * @param   {Number} num1
     * @param   {Number} num2
     * @returns {Number}
     */
    window.jax.rand   = null;
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
})(window);
