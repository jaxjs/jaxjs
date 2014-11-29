/**
 * browser.js
 */
(function(window){
    /** Initial browser object and detection */
    var browser = {
        ua      : navigator.userAgent,
        os      : null,  name    : null,  version : null,
        webkit  : false, mozilla : false, msie    : false,
        chrome  : false, safari  : false, opera   : false,

        // Define mobile browser properties
        mobile     : false, tablet     : false,
        android    : false, apple      : false, windows    : false,
        blackberry : false, pre        : false, device     : null,
        geo        : false,
        /**
         * Function to open a browser window
         *
         * @param {String} url
         * @param {String} name
         * @param {Object} opts
         */
        open : function(url, name, opts) {
            var wid  = (opts.width != undefined)    ? opts.width    : 640;
            var hgt  = (opts.height != undefined)   ? opts.height   : 480;
            var scr  = (opts.scroll != undefined)   ? opts.scroll   : 'no';
            var res  = (opts.resize != undefined)   ? opts.resize   : 'no';
            var stat = (opts.status != undefined)   ? opts.status   : 'no';
            var loc  = (opts.location != undefined) ? opts.location : 'no';
            var mnu  = (opts.menu != undefined)     ? opts.menu     : 'no';
            var tool = (opts.tool != undefined)     ? opts.tool     : 'no';
            var x    = (opts.x != undefined)        ? opts.x        : (screen.width / 2) - (wid / 2);
            var y    = (opts.y != undefined)        ? opts.y        : (screen.height / 2) - (hgt / 2);

            var windowOpts = 'width=' + wid + ',height=' + hgt + ',scrollbars=' + scr + ',resizable=' + res +
                ',status=' + stat + ',location=' + loc + ',menubar=' + mnu + ',toolbar=' + tool +
                ',left=' + x + ',top=' + y;
            window.open(url, name, windowOpts);
        },
        /**
         * Function to route browser to a specific device
         *
         * @param {Object} opts
         */
        route : function(options) {
            if (options == undefined) {
                throw 'The options were not defined.';
            } else if (options.mobile == undefined) {
                throw 'The mobile URL was not defined.';
            }
            var mobile  = options.mobile;
            var desktop = (options.desktop != undefined) ? options.desktop : location.href;

            // Route based on force property
            if (options.force != undefined) {
                if ((options.force.toLowerCase() == 'desktop') && (location.href.indexOf(desktop) == -1)) {
                    window.location = desktop;
                } else if ((options.force.toLowerCase() == 'mobile') && (location.href.indexOf(mobile) == -1)) {
                    window.location = mobile;
                }
                // Else, just route to mobile, if mobile
            } else {
                if ((this.mobile) && (location.href.indexOf(mobile) == -1)) {
                    window.location = mobile;
                }
            }
        }
    };

    /** Calculate browser properties */
    var os  = browser.ua.toLowerCase().match(/(windows|macintosh|linux|freebsd|openbsd|netbsd|sunos)/i);
    var brw = browser.ua.toLowerCase().match(/(chrome|firefox|msie|trident|konqueror|navigator|opera|safari)/i);
    var dev = browser.ua.toLowerCase().match(/(android|blackberry|windows ce|windows phone|opera mini|pre|presto|ipod|iphone|ipad|nokia|symbian|palm|treo|hiptop|avantgo|plucker|xiino|blazer|elaine|teleca|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|pda|psp)/i);

    /** Get platform OS */
    if ((os != null) && (os[0] != undefined)) {
        browser.os = os[0].charAt(0).toUpperCase() + os[0].substring(1).replace('bsd', 'BSD').replace('os', 'OS');
    }

    /** Get browser name */
    if ((brw != null) && (brw[0] != undefined)) {
        if ((brw[0] == 'msie') || (brw[0] == 'trident')) {
            browser.name = 'MSIE';
        } else {
            browser.name = brw[0].charAt(0).toUpperCase() + brw[0].substring(1);
        }
    }

    /** Is it webkit */
    browser.webkit = (browser.ua.toLowerCase().indexOf('webkit') != -1) ;

    /** Has geolocation */
    browser.geo = (navigator.geolocation) ? navigator.geolocation : false;

    /** Get browser and version */
    switch (browser.name) {
        case 'Chrome':
            browser.chrome = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Chrome/') + 7);
            browser.version = browser.version.substring(0, browser.version.indexOf(' '));
            break;
        case 'Firefox':
            browser.mozilla = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Firefox/') + 8);
            break;
        case 'MSIE':
            browser.msie = true;
            if (browser.ua.indexOf('MSIE ') != -1) {
                browser.version = browser.ua.substring(browser.ua.indexOf('MSIE ') + 5);
                browser.version = browser.version.substring(0, browser.version.indexOf(';'));
            } else {
                browser.version = browser.ua.substring(browser.ua.indexOf('rv:') + 3);
                browser.version = browser.version.substring(0, browser.version.indexOf(')'));
            }
            break;
        case 'Konqueror':
            browser.version = browser.ua.substring(browser.ua.indexOf('Konqueror/') + 10);
            browser.version = browser.version.substring(0, browser.version.indexOf(';'));
            break;
        case 'Navigator':
            browser.mozilla = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Navigator/') + 10);
            break;
        case 'Opera':
            browser.opera = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Opera/') + 6);
            browser.version = browser.version.substring(0, browser.version.indexOf(' '));
            break;
        case 'Safari':
            browser.safari = true;
            browser.version = browser.ua.substring(browser.ua.indexOf('Version/') + 8);
            browser.version = browser.version.substring(0, browser.version.indexOf(' '));
            break;
    }

    /** If mobile, get device */
    if ((dev != null) && (dev[0] != undefined)) {
        browser.device = dev[0];
        browser.mobile = true;
        browser.tablet = (browser.device == 'ipad') ? true : !(browser.ua.indexOf('Mobile') != -1);

        switch (browser.device) {
            case 'android':
                browser.android = true;
                break;
            case 'blackberry':
                browser.blackberry = true;
                break;
            case 'ipod':
            case 'ipad':
            case 'iphone':
                browser.apple = true;
                break;
            case 'windows ce':
            case 'windows phone':
                browser.windows = true;
                break;
            case 'pre':
            case 'presto':
                browser.pre = true;
                break;
        }
    }

    window.jax.browser = browser;
})(window);
