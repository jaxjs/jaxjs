/**
 * core/import.js
 */
(function(window){
    /** Function to import variables passed into JS files via a query-string */
    window.jax.importVars = function() {
        var scripts = document.getElementsByTagName('script');
        for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src != undefined) {
                if (scripts[i].src.indexOf('.js?') != -1) {
                    var vars = scripts[i].src.substring(scripts[i].src.indexOf('.js?') + 4);
                    var varsAry = vars.split('&');
                    for (var j = 0; j < varsAry.length; j++) {
                        if (varsAry[j].indexOf('=') != -1) {
                            eval('window.' + varsAry[j].replace('=', ' = "') + '"');
                        }
                    }
                }
            }
        }
    };
})(window);