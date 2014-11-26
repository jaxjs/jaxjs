/** Extend jax with ready method */
jax.extend({
    /**
     * Function to trigger a function when the document object (implied) is loaded & ready.
     *
     * @param {Function} func
     */
    ready : function(func) {
        // Get old onreadystatechange functions, if they exists
        if (document.onreadystatechange == null) {
            document.onreadystatechange = func;
        } else {
            var oldReady = document.onreadystatechange;
            if (typeof oldReady != 'function') {
                document.onreadystatechange = func;
            } else {
                document.onreadystatechange = function() {
                    if (oldReady) {
                        oldReady();
                    }
                    func();
                };
            }
        }
    }
});