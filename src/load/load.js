/**
 * load/load.js
 */
jax.extend({
    /**
     * Function to add a function to the onload stack.
     *
     * @param {Function} func
     */
    load : function(func) {
        var objs = (this.length > 0) ? this.toArray() : [window];
        for (var i = 0; i < objs.length; i++) {
            // Get old onload function(s), if they exist.
            var oldOnLoad = obj[i].onload;

            if (typeof obj[i].onload != 'function') {
                obj[i].onload = func;
            } else {
                obj[i].onload = function() {
                    if (oldOnLoad) {
                        oldOnLoad();
                    }
                    func();
                };
            }
        }
    }
});