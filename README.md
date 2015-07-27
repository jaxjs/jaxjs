Jax JavaScript Library
=================================

RELEASE INFORMATION
-------------------
Jax JavaScript Library 4.0.0  
Released July 26, 2015

OVERVIEW
--------
Jax JavaScript Library is a lightweight, robust JavaScript library
that follows a set of standards and practices set and adhered to by
other similar JavaScript libraries. It provides a set of built-in
tools to create, select and manipulate various DOM elements. It
also provides the functionality to handle various other dynamic
DOM features as well:

* AJAX requests
* Attributes
* Cookies
* CSS
* Effects
* Events
* Storage

Jax also allows you to write your own components and extensions and
easily include your code by extending the library. 

INSTALL
-------

Installation is as easy as downloading it and including it in
your web project's source code. In this repo, there is a `build/`
folder with four main JS source files in it:

    build/jax.4.0.0.js           // Full version, uncompressed
    build/jax.4.0.0.lite.js      // Lite version, uncompressed
    build/jax.4.0.0.lite.min.js  // Lite version, compressed
    build/jax.4.0.0.min.js       // Full version, compressed

## BASIC USAGE

Here are some common use cases and examples: 

* [DOM selection and manipulation](#dom-selection-and-manipulation)
* [CSS manipulation](#css-manipulation)
* [Effects](#effects)
* [Events](#events)
* [AJAX](#ajax)
* [No-conflict](#no-conflict)
* [Extending Jax](#extending-jax)

### DOM selection and manipulation

Of course, DOM selection is one of the most common features of any JS library:

```js
var li = $('#my-list > li');

for (var i = 0; i < li.length; i++) {
    console.log(li[i].val()); // Prints the inner HTML of the LI tag
}
```

##### Creating and appending new elements

You can easily append some new elements to the DOM as well. Let's append a new
`li` element to that `ul` element:

```js
$('#my-list').append('li', {"class" : "new-li"}, 'Some Inner HTML.');
```

Or we could prepend it as well:

```js
$('#my-list').prepend('li', {"class" : "new-li"}, 'Put this one first.');
```

There's also shorthand append and prepend methods for more complex element sets,
such as form fields:

```js
// Append an input field
$('#my-div').appendInput({
    "type" : "text",
    "name" : "first_name",
    "id"   : "first_name",
    "size" : "30"
});

// Append a group of checkbox elements
$('#my-div').appendCheckbox(['Red', 'White', 'Blue'], {
    "name" : "colors[]",
    "id"   : "colors"
});

// Append a group of radio elements
$('#my-div').appendRadio({
    "num1" : 12,
    "num2" : 14,
    "num3" : 16
}, {
    "name" : "nums",
    "id"   : "nums"
});

// Append a select element
$('#my-div').appendSelect({
    "Purple" : "Purple",
    "Green"  : "Green",
    "Gold"   : "Gold"
}, {
    "name" : "more_colors",
    "id"   : "more_colors"
});

// Append a textarea element
$('#my-div').appendTextarea({
    "name" : "some_text",
    "id"   : "some_text",
    "rows" : "5",
    "cols" : "50"
});
```

Of course the above methods have `prepend*` counterparts to prepend them to the
selected element instead of appending them.

##### Cloning elements

You can also easily clone existing elements and append them to another element.
You can pass some overriding attributes to be applied to the new element as well:

```js
$('#existing-element').clone({"id" : "new-element"}).appendTo('#my-div');
```

[Top](#basic-usage)

### CSS manipulation

CSS manipulation is another common core feature set. You can set CSS rules
individually or you can set many at once in a group:

```js
$('#my-div').css('background-color', '#fff');
```

```js
$('#my-div').css({
    "margin"  : "10px",
    "padding" : "10px",
    "width"   : "200px",
    "height"  : "80px"
});
```

Of course, you can retrieve CSS values like this:

```js
var divHeight = $('#my-div').css('height');
```

[Top](#basic-usage)

### Effects

Effects bring a lot of fun and dynamic content alive in the DOM world.
In the effect component within Jax, you can control a number of properties
for animations:

* __Tween__: the number of steps or frames calculated between the beginning and
  ending of an animation
* __Speed__: the number of seconds over which to execute the entire animation
* __Easing__: the easing function to use to calculate the frames to give the
  illusion of "easing" the animation. The most basic easing function is the
  `$.tween.linear` function. The other built-in easing functions are:

| Ease In                | Ease Out                | Ease In/Out               |
|------------------------|-------------------------|---------------------------|
| $.tween.easein.back    | $.tween.easeout.back    | $.tween.easeinout.back    |
| $.tween.easein.bounce  | $.tween.easeout.bounce  | $.tween.easeinout.bounce  |
| $.tween.easein.circ    | $.tween.easeout.circ    | $.tween.easeinout.circ    |
| $.tween.easein.cubic   | $.tween.easeout.cubic   | $.tween.easeinout.cubic   |
| $.tween.easein.elastic | $.tween.easeout.elastic | $.tween.easeinout.elastic |
| $.tween.easein.expo    | $.tween.easeout.expo    | $.tween.easeinout.expo    |
| $.tween.easein.quad    | $.tween.easeout.quad    | $.tween.easeinout.quad    |
| $.tween.easein.quart   | $.tween.easeout.quart   | $.tween.easeinout.quart   |
| $.tween.easein.quint   | $.tween.easeout.quint   | $.tween.easeinout.quint   |
| $.tween.easein.sine    | $.tween.easeout.sine    | $.tween.easeinout.sine    |


The built-in animation methods are:

* move
* resize
* fade
* scroll
* slide
* wipe
* color

You can give it direct values in which to animate, such as:

```js
$('#mydiv').move(50, 400, {
    tween  : 25,
    speed  : 100,
    easing : $.tween.easein.quad
});
```

Or, you can animate it incrementally as well:

```js
$('#mydiv').move('+=100', '+=100', {
    tween  : 25,
    speed  : 100,
    easing : $.tween.easein.quad
});
```

[Top](#basic-usage)

### Events

Events are typically handled by selecting an element or elements and attaching
and event and callback to them.

```php
$('#my-link').on('click', function(){
    console.log('You clicked me!');
});
```

There are shorthand methods for a number of events as well:

```php
$('#my-link').click(function(){
    console.log('You clicked me!');
});
```

And you can trigger any event whenever you need to:

```php
$('#my-link').trigger('click');
```

[Top](#basic-usage)

### AJAX

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

[Top](#basic-usage)

### No-conflict

Of course, if you intend on using Jax with other JS libraries, you can
declare the `noConflict()` method to guard against any namespace clashes:

```js
var jax = jax.noConflict();
```

[Top](#basic-usage)

### Extending Jax

Jax provides a way to extend its functionality by writing and injecting your
own code via the `extend` method:

##### Extending within the instance

The main way to extend Jax is within the instance, which will expose the new
functionality and make it available on the instance level. That means you'll
be able to utilize your new functionality with whatever elements are currently
selected with the Jax instance:

```js
jax.extend({
    myNewProperty : null; 
    myNewFeature  : function() {
        // Apply feature to the instance's selected elements
        this.myNewProperty = 1;
    }
});
```

Then you would use the new functionality like this:

```js
$('#my-list > li').myNewFeature();
```

##### Extending statically

Extending Jax statically is a nice way to attach functionality that serves
a more global purpose and isn't as dependant on the Jax instance or any
elements it may have selected.

```js
(function(window){
    window.jax.myNewStaticFeature = function() {
        // Do some global functionality 
    };
})(window);
```

You would then call the new static functionality like this:

```js
$.myNewStaticFeature();
```

Extending Jax in either of these ways also helps keep the namespace under
control and minimize any possible collisions. This way, everything is kept
neatly under the Jax namespace and object.

[Top](#basic-usage)