/** Extend jax with unload method */
jax.extend({
    /**
     * Function to add a function to the unload stack.
     *
     * @param {Function} func
     */
    unload : function(func) {
        var objs = (this.length > 0) ? this.toArray() : [window];
        for (var i = 0; i < objs.length; i++) {
            // Get old unload function(s), if they exist.
            var oldUnLoad = obj[i].onunload;

            if (typeof obj[i].onunload != 'function') {
                obj[i].onunload = func;
            } else {
                obj[i].onunload = function() {
                    if (oldUnLoad) {
                        oldUnLoad();
                    }
                    func();
                };
            }
        }
    }
});