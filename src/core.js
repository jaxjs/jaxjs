/**
 * core.js
 */
(function(window){
    /**
     * Base jax constructor class
     * @constructor
     */
    var jax     = function(){};
    jax.version = '4.0.0a';

    /**
     * Method to extend the jax class prototype
     *
     * @param {Object}  prop
     * @param {Boolean} over
     */
    jax.extend = function(prop, over) {
        var override = ((over != undefined) && (over != null)) ? over : false;
        var prototype = this.prototype;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            if ((typeof prototype[name] != "undefined") && (!override)) {
                throw "You are not allowed to override '" + name + "' property in jax.";
            } else {
                prototype[name] = prop[name];
            }
        }

        jax.prototype = prototype;
        jax.prototype.constructor = jax;
    };

    /** The main jax prototype */
    jax.prototype = {
        version    : jax.version,
        selector   : null,
        length     : 0,
        view       : {
            width  : 0,
            height : 0
        },
        /**
         * Main init/constructor function of the jax class
         *
         * @param   {Mixed} selector
         * @returns jax
         */
        init : function(selector) {
            this.selector = selector;

            // Start the selection process
            if (this.selector != undefined) {
                // If selector is the window object, document object or pre-selected object
                if ((this.selector == document) || (this.selector == window) || ((this.selector.constructor != Array) && (this.selector.constructor != String))) {
                    this.push(this.selector);
                // Else, make selection
                } else {
                    try {
                        // Special case for the :button selector
                        if (this.selector.indexOf(':button') != -1) {
                            var oldSel = this.selector;
                            this.selector = this.selector.replace(':button', '[type=button]');
                            if (oldSel.substring(0, 1) == ':') {
                                this.selector = this.selector + oldSel.replace(':button', ', button');
                            } else {
                                oldSel = oldSel.replace(':button', ' button');
                                this.selector = this.selector + ', ' + oldSel;
                            }
                        }

                        // Special cases for other type selectors
                        var typeSelectors = [
                            ':checkbox', ':file', ':image', ':password',
                            ':radio', ':reset', ':submit', ':text'
                        ];

                        for (var i = 0; i < typeSelectors.length; i++) {
                            if (this.selector.indexOf(typeSelectors[i]) != -1) {
                                this.selector = this.selector.replace(typeSelectors[i], '[type=' + typeSelectors[i].substring(1) + ']');
                            }
                        }

                        // Special case for the :selected pseudo selector
                        var selected = false;
                        if (this.selector.indexOf(':selected') != -1) {
                            selected = true;
                            this.selector = this.selector.replace(':selected', '');
                        }

                        var elems = document.querySelectorAll(this.selector);
                        for (var i = 0; i < elems.length; i++) {
                            if ((!selected) || ((selected) && (elems[i].selected))) {
                                this.push(elems[i]);
                            }
                        }
                    } catch (error) {
                        console.log(error.message + ' (' + this.selector + ').');
                    }
                }
            }

            // Get the viewport dimensions
            this.view.width = window.innerWidth;
            this.view.height = window.innerHeight;

            return this;
        },
        /**
         * Basic concat() function to uphold the array-like functionality of a jax object
         *
         * @return {Array}
         */
        concat : function() {
            return Array.prototype.concat.apply(this, arguments);
        },
        /**
         * Basic push() function to uphold the array-like functionality of a jax object
         *
         * @param   {Mixed} arg
         * @returns {jax}
         */
        push : function(arg) {
            Array.prototype.push.call(this, arg);
            return this;
        },
        /**
         * Basic pop() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        pop : function() {
            Array.prototype.pop.call(this);
            return this;
        },
        /**
         * Basic reverse() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        reverse : function() {
            Array.prototype.reverse.call(this);
            return this;
        },
        /**
         * Basic shift() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        shift : function() {
            Array.prototype.shift.call(this);
            return this;
        },
        /**
         * Basic slice() function to uphold the array-like functionality of a jax object
         *
         * @returns {Array}
         */
        slice : function() {
            return Array.prototype.slice.apply(this, arguments);
        },
        /**
         * Basic splice() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        splice : function() {
            Array.prototype.splice.apply(this, arguments);
            return this;
        },
        /**
         * Basic unshift() function to uphold the array-like functionality of a jax object
         *
         * @returns {jax}
         */
        unshift : function() {
            Array.prototype.unshift.apply(this, arguments);
            return this;
        },
        /** Function to empty out the selected collection array */
        clear  : function() {
            while (this.length > 0) {
                this.pop();
            }
        },
        /**
         * Function to convert the jax object into a pure array
         *
         * @returns {Array}
         */
        toArray : function() {
            var ary = []
            for (var i = 0; i < this.length; i++) {
                ary.push(this[i]);
            }
            return ary;
        }
    };

    /**
     * Main jax object for the global space
     *
     * @param   {Mixed} selector
     * @returns {jax}
     */
    window.jax = function(selector) {
        return new jax().init(selector);
    };

    window.jax.prototype = jax.prototype;
    window.jax.version   = jax.version;

    /** The "no conflict" function under the main jax object */
    window.jax.noConflict = function() {
        delete window.$;
        return window.jax;
    };

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
     * Function to extend the jax class prototype in the global space
     *
     * @param {Object}  prop
     * @param {boolean} over
     */
    window.jax.extend = function(prop, over) {
        var override = ((over != undefined) && (over != null)) ? over : false;
        var prototype = window.jax.prototype;

        // Copy the properties over onto the new prototype
        for (var name in prop) {
            if ((typeof prototype[name] != "undefined") && (!override)) {
                throw "You are not allowed to override '" + name + "' property in jax.";
            } else {
                prototype[name] = prop[name];
            }
        }

        window.jax.prototype = prototype;
        window.jax.prototype.constructor = window.jax;
        window.$ = window.jax;
    };

    /** Assign the $ alias object */
    window.$ = window.jax;
})(window);

