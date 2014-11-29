/**
 * event/mouse.js
 */
jax.extend({
    /**
     * Function to attach a event to the onmousedown of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mousedown : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmousedown = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseenter of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseenter : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseenter = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseleave of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseleave : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseleave = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmousemove of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mousemove : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmousemove = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseout of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseout : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseout = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseover of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseover : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseover = func;
            }
        }
        return this;
    },
    /**
     * Function to attach a event to the onmouseup of an object
     *
     * @param   {Function} func
     * @returns {jax}
     */
    mouseup : function(func) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].onmouseup = func;
            }
        }
        return this;
    }
});