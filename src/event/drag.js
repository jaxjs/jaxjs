/**
 * event/drag.js
 */
jax.extend({
    /**
     * Function to attach drag actions (start/on/stop), both on mouse and touch events
     *
     * @param   {Object} opts
     * @returns {jax}
     */
    drag : function(opts) {
        if (this.length > 0) {
            window.jax.drag = {
                startX : 0,
                startY : 0,
                orgX   : 0,
                orgY   : 0,
                deltaX : 0,
                deltaY : 0,
                isDrag : false
            };
            var startDrag   = ((opts != undefined) && (opts.startDrag != undefined)) ? opts.startDrag : null;
            var onDrag      = ((opts != undefined) && (opts.onDrag != undefined))    ? opts.onDrag : null;
            var stopDrag    = ((opts != undefined) && (opts.stopDrag != undefined))  ? opts.stopDrag : null;
            var cursor      = ((opts != undefined) && (opts.cursor != undefined))    ? opts.cursor : null;
            var bound       = ((opts != undefined) && (opts.bound != undefined))     ? opts.bound : null;
            var axis        = ((opts != undefined) && (opts.axis != undefined))      ? opts.axis : null;
            var boundTop    = null;
            var boundLeft   = null;
            var boundRight  = null;
            var boundBottom = null;
            var onDragFunc  = null;

            var dev    = browser.ua.toLowerCase().match(/(android|blackberry|windows ce|windows phone|opera mini|pre|presto|ipod|iphone|ipad|nokia|symbian|palm|treo|hiptop|avantgo|plucker|xiino|blazer|elaine|teleca|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|pda|psp)/i);
            var mobile = ((dev != null) && (dev[0] != undefined));

            for (var i = 0; i < this.length; i++) {
                var obj = this[i];
                if (bound != null) {
                    if (bound.constructor == String) {
                        boundTop    = 0;
                        boundLeft   = 0;
                        if (bound == 'parent') {
                            boundRight  = window.jax(window.jax(obj).parent()).width() - window.jax(obj).width();
                            boundBottom = window.jax(window.jax(obj).parent()).height() - window.jax(obj).height();
                        } else {
                            boundRight  = window.jax(bound).width() - window.jax(obj).width();
                            boundBottom = window.jax(bound).height() - window.jax(obj).height();
                        }
                    } else if (bound.constructor == Object) {
                        if (bound.top != undefined) {
                            boundTop = (bound.top.constructor == String) ? 0 : bound.top;
                        }
                        if (bound.left != undefined) {
                            boundLeft = (bound.left.constructor == String) ? 0 : bound.left;
                        }
                        if (bound.right != undefined) {
                            boundRight = (bound.right.constructor == String) ?
                                window.jax(bound.right).width() - window.jax(obj).width() : bound.right;
                        }
                        if (bound.bottom != undefined) {
                            boundBottom = (bound.bottom.constructor == String) ?
                                window.jax(bound.bottom).height() - window.jax(obj).height() : bound.bottom;
                        }
                    }
                }
                if (mobile) {
                    window.jax(this[i]).touchstart(function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        window.jax.drag.startX = window.jax(obj).mouseX(event);
                        window.jax.drag.startY = window.jax(obj).mouseY(event);
                        window.jax.drag.orgX   = window.jax(obj).css('left');
                        window.jax.drag.orgY   = window.jax(obj).css('top');
                        window.jax.drag.isDrag = true;
                        if (startDrag != null) {
                            startDrag(event, obj);
                        }
                        onDragFunc = function(event){
                            var x = window.jax().mouseX(event) - window.jax.drag.startX;
                            var y = window.jax().mouseY(event) - window.jax.drag.startY;
                            window.jax.drag.deltaX = window.jax(obj).css('left') - window.jax.drag.orgX;
                            window.jax.drag.deltaY = window.jax(obj).css('top') - window.jax.drag.orgY;
                            if (bound != null) {
                                if ((boundLeft != null) && (x < boundLeft)) {
                                    x = boundLeft;
                                }
                                if ((boundTop != null) && (y < boundTop)) {
                                    y = boundTop;
                                }
                                if ((boundRight != null) && (x >= boundRight)) {
                                    x = boundRight;
                                }
                                if ((boundBottom != null) && (y >= boundBottom)) {
                                    y = boundBottom;
                                }
                            }

                            switch (axis) {
                                case 'x':
                                    window.jax(obj).css('left', x + 'px');
                                    break;
                                case 'y':
                                    window.jax(obj).css('top', y + 'px');
                                    break;
                                default:
                                    window.jax(obj).css('left', x + 'px').css('top', y + 'px');
                            }

                            if (onDrag != null) {
                                onDrag(event, obj);
                            }
                        };
                        window.jax(obj).touchmove(onDragFunc);
                    });
                    window.jax(this[i]).touchend(function(event) {
                        window.jax(obj).off('touchmove', onDragFunc);
                        if (stopDrag != null) {
                            stopDrag(event, obj);
                        }
                    });
                } else {
                    if ((cursor != null) && (cursor.over != undefined)) {
                        this[i].onmouseover = function(event) {
                            window.jax(obj).css('cursor', cursor.over);
                        };
                    }
                    this[i].onmousedown = function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        window.jax.drag.startX = window.jax(obj).mouseX(event);
                        window.jax.drag.startY = window.jax(obj).mouseY(event);
                        window.jax.drag.orgX   = window.jax(obj).css('left');
                        window.jax.drag.orgY   = window.jax(obj).css('top');
                        window.jax.drag.isDrag = true;
                        if ((cursor != null) && (cursor.down != undefined)) {
                            window.jax(obj).css('cursor', cursor.down);
                        }
                        if (startDrag != null) {
                            startDrag(event, obj);
                        }
                        onDragFunc = function(event){
                            event.preventDefault();
                            event.stopPropagation();
                            var x = window.jax().mouseX(event) - window.jax.drag.startX;
                            var y = window.jax().mouseY(event) - window.jax.drag.startY;
                            window.jax.drag.deltaX = window.jax(obj).css('left') - window.jax.drag.orgX;
                            window.jax.drag.deltaY = window.jax(obj).css('top') - window.jax.drag.orgY;
                            if (bound != null) {
                                if ((boundLeft != null) && (x < boundLeft)) {
                                    x = boundLeft;
                                }
                                if ((boundTop != null) && (y < boundTop)) {
                                    y = boundTop;
                                }
                                if ((boundRight != null) && (x >= boundRight)) {
                                    x = boundRight;
                                }
                                if ((boundBottom != null) && (y >= boundBottom)) {
                                    y = boundBottom;
                                }
                            }

                            switch (axis) {
                                case 'x':
                                    window.jax(obj).css('left', x + 'px');
                                    break;
                                case 'y':
                                    window.jax(obj).css('top', y + 'px');
                                    break;
                                default:
                                    window.jax(obj).css('left', x + 'px').css('top', y + 'px');
                            }

                            if (onDrag != null) {
                                onDrag(event, obj);
                            }
                        };
                        window.jax(document).on('mousemove', onDragFunc);
                    };

                    window.jax(document).on('mouseup', function(event) {
                        event.stopPropagation();
                        window.jax.drag.isDrag = false;
                        window.jax(document).off('mousemove', onDragFunc);
                        if (cursor != null) {
                            window.jax(obj).css('cursor', 'auto');
                        }
                        if (stopDrag != null) {
                            stopDrag(event, obj);
                        }
                    }, true);

                    this[i].onmouseup = function(event) {
                        window.jax.drag.isDrag = false;
                        window.jax(document).off('mousemove', onDragFunc);
                        if (cursor != null) {
                            window.jax(obj).css('cursor', 'auto');
                        }
                        if (stopDrag != null) {
                            stopDrag(event, obj);
                        }
                    };
                }
            }
        }
        return this;
    }
});