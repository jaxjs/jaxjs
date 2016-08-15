Jax JavaScript Library
=================================

<img src="http://www.jaxjs.org/img/jax-javascript-logo.png" width="180" height="180" />

RELEASE INFORMATION
-------------------
Jax JavaScript Library 5.0.0  
Released July 18, 2016

OVERVIEW
--------
Jax JavaScript Library is a lightweight, robust JavaScript library
that follows a set of standards and practices set and adhered to by
other similar JavaScript libraries. It can be installed next to
and work alongside other JavaScript librarires, such as jQuery.

Built-in features include:

* Simplified AJAX Requests
* Accessing Browser Data
* Handling Cookies
* Storage

INSTALL
-------

Installation is as easy as downloading it and including it in
your web project's source code. In this repo, there is a `build/`
folder with the main JS source files in it:

    build/jax.5.0.0.js           // Uncompressed
    build/jax.5.0.0.min.js       // Compressed

## USING AJAX

The Jax JavaScript Library handles AJAX requests as well. It even provides auto-detection
of content types to try and make handling data easier for you. The common content-types
that are supported for auto-detection are JSON, CSV and XML. Furthermore, you can
assign handlers for what happens based on response status codes.

##### GET request

First, let's start with a simple example where we grab some content from a text file:

```js
$.get('./test.txt', {
    "status" : {
        200 : function(response) {
            $('#response').val(response.text);
        },
        404 : function(response) {
            $('#response').val('The requested resource was not found.');
        },
        "error" : function(response) {
            $('#response').val('There was an unknown error.');
        }
    }
});
```

In the above example, we perform a GET request to the `test.txt` URL and we set a callback
function to set the `#response` element's contents to the text content from the response.
We also set a specific 404 status callback should the URL not be found, as well a generic
error callback in case something unknown goes wrong.

##### POST request with a form object

```js
$.post('./process/form.php', {
    "status" : {
        200 : function(response) {
            $('#result').val(response.text);
        },
        "error" : function(response) {
            $('#response').val('There was an unknown error.');
        }
    },
    "data" : $('#user-form')[0]
});
```

In the above example, we are sending a POST request and directly attaching a form element
that is in the DOM. You can also attach an array or an object of data as well. It will
auto-detect and correctly build the query to be sent over. 

##### Content-type detection
 
Jax will make an attempt to auto-detect and parse any response content that comes back
over from the request. This makes is very convenient to access the data:

###### JSON

```js
var json = $.ajax('file.json');
console.log(json.user_name);
```

###### CSV

```js
var csv = $.ajax('file.csv');
console.log(csv[0].user_name);
```

###### XML

```js
var xml = $.ajax('file.xml');
console.log(xml.test.nodes[0].user.user_name);
```

