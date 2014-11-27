/**
 * children/child.js
 */
jax.extend({
    childIndex : 0,
    /**
     * Function to get a child element of the current element
     *
     * @returns {Mixed}
     */
    child : function(i) {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            this.childIndex = i;
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the child nodes of an element
     *
     * @returns {Array}
     */
    children : function() {
        return ((this[0] != undefined) && (this[0].hasChildNodes())) ? this[0].childNodes : [];
    },
    /**
     * Function to return the first child node of an element
     *
     * @returns {Mixed}
     */
    first : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            this.childIndex = 0;
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the last child node of an element
     *
     * @returns {Mixed}
     */
    last : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            this.childIndex = this[0].childNodes.length - 1;
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the next child node of an element
     *
     * @returns {Mixed}
     */
    next : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            if (this.childIndex == (this[0].childNodes.length - 1)) {
                this.childIndex = 0;
            } else {
                this.childIndex++;
            }
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    },
    /**
     * Function to return the previous child node of an element
     *
     * @returns {Mixed}
     */
    prev : function() {
        if ((this[0] != undefined) && (this[0].hasChildNodes())) {
            if (this.childIndex == 0) {
                this.childIndex = this[0].childNodes.length - 1;
            } else {
                this.childIndex--;
            }
            return this[0].childNodes[this.childIndex];
        } else {
            return undefined;
        }
    }
});