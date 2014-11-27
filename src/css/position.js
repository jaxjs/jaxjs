/**
 * css/position.js
 */
jax.extend({
    /** Function to get the element's offset top position */
    top : function() {
        return ((this[0] != undefined) && (this[0].offsetTop != undefined)) ? this[0].offsetTop : undefined;
    },
    /** Function to get the element's offset left position */
    left : function() {
        return ((this[0] != undefined) && (this[0].offsetLeft != undefined)) ? this[0].offsetLeft : undefined;
    }
});