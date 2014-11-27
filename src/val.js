/**
 * val.js
 */
jax.extend({
    /**
     * Function to get or set element value(s)
     *
     * @param   {Mixed} value
     * @returns {Mixed}
     */
    val : function(value) {
        // If getting value(s)
        if (value == null) {
            var v = [];
            for (var i = 0; i < this.length; i++) {
                if (this[i].nodeName == 'SELECT') {
                    for (var j = 0; j < this[i].options.length; j++) {
                        if (this[i].options[j].selected) {
                            v.push(this[i].options[j].value);
                        }
                    }
                } else if (((this[i].type == 'checkbox') || (this[i].type == 'radio')) && (this[i].checked)) {
                    v.push(this[i].value);
                } else if (this[i].value != undefined) {
                    v.push(this[i].value);
                } else if (this[i].getAttribute('value') != undefined) {
                    v.push(this[i].getAttribute('value'));
                } else if (this[i].innerHTML != undefined) {
                    v.push(this[i].innerHTML);
                } else if (this[i].innerText != undefined) {
                    v.push(this[i].innerText);
                } else if (this[i].nodeValue != undefined) {
                    v.push(this[i].nodeValue);
                }
            }
            return (v.length == 1) ? v[0] : v;
            // If setting value(s)
        } else {
            for (var i = 0; i < this.length; i++) {
                if ((this[i].type == 'checkbox') || (this[i].type == 'radio')) {
                    if (value.constructor == Array) {
                        for (var k = 0; k < value.length; k++) {
                            if (this[i].value == value[k]) {
                                this[i].checked = true;
                            }
                        }
                    } else if (this[i].value == value) {
                        this[i].checked = true;
                    }
                } else if (this[i].nodeName == 'SELECT') {
                    for (var j = 0; j < this[i].options.length; j++) {
                        if (value.constructor == Array) {
                            for (var k = 0; k < value.length; k++) {
                                if (this[i].options[j].value == value[k]) {
                                    this[i].options[j].selected = true;
                                }
                            }
                        } else if (this[i].options[j].value == value) {
                            this[i].options[j].selected = true;
                        }
                    }
                } else {
                    if (this[i].value != undefined) {
                        this[i].value = value;
                    } else if (this[i].getAttribute('value') != undefined) {
                        this[i].setAttribute('value', value);
                    } else if (this[i].innerHTML != undefined) {
                        this[i].innerHTML = value;
                    } else if (this[i].innerText != undefined) {
                        this[i].innerText = value;
                    } else if (this[i].nodeValue != undefined) {
                        this[i].nodeValue = value;
                    }
                }
            }
        }
    }
});