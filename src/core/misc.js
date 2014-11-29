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
})(window);
