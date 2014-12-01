/**
 * load/unload.js
 */
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
            var oldUnLoad = objs[i].onunload;

            if (typeof objs[i].onunload != 'function') {
                objs[i].onunload = func;
            } else {
                objs[i].onunload = function() {
                    if (oldUnLoad) {
                        oldUnLoad();
                    }
                    func();
                };
            }
        }
    }
});