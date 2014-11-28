/**
 * storage.js
 */
(function(window){
    window.jax.storage = {
        length : 0,
        /**
         * Function to save a value to local storage
         *
         * @param   {String} name
         * @param   {Mixed}  value
         * @returns {Object}
         */
        save   : function(name, value) {
            if (typeof value != 'string') {
                if (typeof value == 'number') {
                    value = value.toString();
                } else {
                    value = JSON.stringify(value);
                }
            }
            window.localStorage[name] = value;
            this.length = window.localStorage.length;
            return this;
        },
        /**
         * Function to get a value from local storage
         *
         * @param   {String} name
         * @returns {Mixed}
         */
        load : function(name) {
            if (name == null) {
                var value = {};
                for (var n in window.localStorage) {
                    var v = window.localStorage[n];
                    if ((v.indexOf('{') != -1) || (v.indexOf('[') != -1)) {
                        v = JSON.parse(decodeURIComponent(v));
                    }
                    value[n] = v;
                }
            } else {
                var value = window.localStorage[name];
                if ((value.indexOf('{') != -1) || (value.indexOf('[') != -1)) {
                    value = JSON.parse(decodeURIComponent(value));
                }
            }
            return value;
        },
        /**
         * Function to remove a value or all values from local storage
         *
         * @param   {String} name
         * @returns {Object}
         */
        remove : function(name) {
            if (name == null) {
                window.localStorage.clear();
            } else {
                window.localStorage.removeItem(name);
            }
            this.length = window.localStorage.length;
            return this;
        }
    };
})(window);