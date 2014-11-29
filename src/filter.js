/**
 * filter.js
 */
jax.extend({
    /**
     * Function to apply a filter to the collection
     * Available filters are:
     *     :contains('some text'), :even, :odd, :checked, :selected, :hidden, :visible
     *     :button, :checkbox, :file, :image, :password, :radio, :reset, :submit, :text
     *
     * @param   {String} filter
     * @returns {jax}
     */
    filter : function(filter) {
        var ary = [];

        if (filter.indexOf(':contains(') != -1) {
            var text = filter.substring(filter.indexOf('(') + 1);
            text = text.substring(0, text.lastIndexOf(')'));
            if ((text.substring(0, 1) == '"') || (text.substring(0, 1) == "'")) {
                text = text.substring(1);
                text = text.substring(0, (text.length - 1));
            }
            for (var i = 0; i < this.length; i++) {
                if (this[i].innerHTML.indexOf(text) != -1) {
                    ary.push(this[i]);
                }
            }
        }

        switch (filter) {
            case ':even':
                for (var i = 0; i < this.length; i++) {
                    if ((i % 2) == 0) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':odd':
                for (var i = 0; i < this.length; i++) {
                    if ((i % 2) != 0) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':checked':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].checked) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':selected':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].selected) {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':hidden':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].style.display == 'none') {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':visible':
                for (var i = 0; i < this.length; i++) {
                    if (this[i].style.display != 'none') {
                        ary.push(this[i]);
                    }
                }
                break;
            case ':button':
            case ':checkbox':
            case ':file':
            case ':image':
            case ':password':
            case ':radio':
            case ':reset':
            case ':submit':
            case ':text':
                var type = filter.substring(1);
                for (var i = 0; i < this.length; i++) {
                    if (this[i].getAttribute('type') == type) {
                        ary.push(this[i]);
                    }
                }
                break;
        }

        this.clear();

        for (var i = 0; i < ary.length; i++) {
            this.push(ary[i]);
        }

        return this;
    }
});

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
