/**
 * clone.js
 */
jax.extend({
    cloned : null,
    /**
     * Function to clone an element
     *
     * @param   {Object}  attribs
     * @param   {Boolean} deep
     * @param   {Boolean} events
     * @returns {jax}
     */
    clone  : function(attribs, deep, events) {
        if (this[0] == undefined) {
            throw 'An object must be selected to clone.';
        }

        var d = (deep != undefined)   ? deep : true;
        var e = (events != undefined) ? events : false;
        var c = this[0].cloneNode(d);

        // Define the events to check for
        var evts = [
            'onblur', 'onchange', 'onclick', 'onfocus', 'onkeydown',
            'onkeyup', 'onkeypress', 'onmousedown', 'onmouseenter',
            'onmouseleave', 'onmousemove', 'onmouseover', 'onmouseout',
            'onmouseup', 'onscroll', 'onselect', 'onsubmit'
        ];

        // Function to recursively crawl through the
        // child nodes to check for and assign events
        var crawl = function(par, cloned) {
            if (par.hasChildNodes()) {
                for (var j = 0; j < par.childNodes.length; j++) {
                    for (var k = 0; k < evts.length; k++) {
                        if (par.childNodes[j][evts[k]] != undefined) {
                            cloned.childNodes[j][evts[k]] = par.childNodes[j][evts[k]];
                        }
                    }
                    if (par.childNodes[j].hasChildNodes()) {
                        crawl(par.childNodes[j], cloned.childNodes[j]);
                    }
                }
            }
        };

        // Set any element override attributes.
        if ((attribs != undefined) && (attribs != null)) {
            for (var attrib in attribs) {
                c.setAttribute(attrib, attribs[attrib]);
            }
        }

        // If the events flag is set
        if (e) {
            for (var i = 0; i < evts.length; i++) {
                if (this[0][evts[i]] != undefined) {
                    c[evts[i]] = this[0][evts[i]];
                }
            }
            // If the deep flag is set, crawl for child events
            if (d) {
                crawl(this[0], c);
            }
        }

        this.cloned = c;
        return this;
    },
    /**
     * Function to append an newly cloned element to another one
     *
     * @param   {Mixed}  selector
     * @param   {Object} cloned
     * @returns {jax}
     */
    appendTo : function(selector, cloned) {
        if ((cloned == undefined) && (this.cloned != undefined)) {
            cloned = this.cloned;
            this.cloned = null;
        } else {
            throw 'The child object to append was not defined.';
        }
        window.jax(selector)[0].appendChild(cloned);
        return this;
    },
    /**
     * Function to prepend an newly cloned element to another one
     *
     * @param   {Mixed}  selector
     * @param   {Object} cloned
     * @returns {jax}
     */
    prependTo : function(selector, cloned) {
        if ((cloned == undefined) && (this.cloned != undefined)) {
            cloned = this.cloned;
            this.cloned = null;
        } else {
            throw 'The child object to prepend was not defined.';
        }
        var obj = window.jax(selector)[0];
        if (obj.childNodes[0] != undefined) {
            obj.insertBefore(cloned, obj.childNodes[0]);
        }
        return this;
    }
});