/**
 * Function to add a before unload method to the window object
 *
 * @param {Function} func
 */
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
