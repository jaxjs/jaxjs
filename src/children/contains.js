/**
 * children/contains.js
 */
(function(window){
    /**
     * Function to check if the container contains the contained
     *
     * @param   {Object}  container
     * @param   {Object}  contained
     * @returns {Boolean}
     */
    window.jax.contains = function(container, contained) {
        // Function to traverse a node
        var traverse = function(parent, child) {
            var contains = false;
            if (parent.hasChildNodes()) {
                for (var i = 0; i < parent.childNodes.length; i++) {
                    if (parent.childNodes[i] == child) {
                        contains = true;
                    } else if (!contains) {
                        contains = traverse(parent.childNodes[i], child);
                    }
                }
            }
            return contains;
        };

        return traverse(container, contained);
    };
})(window);