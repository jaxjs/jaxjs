/**
 * ajax/http.js
 */
(function(window){
    window.jax.http = {
        /**
         * Function to get the HTTP request status of a URL
         *
         * @param   {String} url
         * @returns {Number}
         */
        getStatus : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            return http.status;
        },
        /**
         * Function to determine if the HTTP request is successful
         *
         * @param   {String} url
         * @returns {boolean}
         */
        isSuccess : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return ((type == 3) || (type == 2) || (type == 1));
        },
        /**
         * Function to determine if the HTTP request is a redirect
         *
         * @param   {String} url
         * @returns {boolean}
         */
        isRedirect : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return (type == 3);
        },
        /**
         * Function to determine if the HTTP request is an error
         *
         * @param   {String} url
         * @returns {boolean}
         */
        isError : function(url) {
            var http = new XMLHttpRequest();
            http.open('HEAD', url, false);
            http.send();
            var type = Math.floor(http.status / 100);
            return ((type == 5) || (type == 4));
        }
    };
})(window);
