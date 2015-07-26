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
DOM features:

* AJAX requests
* Attributes
* Cookies
* CSS manipulation
* Effects
* Events
* Storage

INSTALL
-------

Installation is as easy as downloading it and including it in
your web project's source code.

## BASIC USAGE

Here are some common use cases and examples: 

* [DOM selection and manipulation](#dom-selection-and-manipulation)
* [CSS manipulation](#css-manipulation)
* [Events](#events)
* [Effects](#effects)
* [AJAX](#ajax)
* [No-conflict](#no-conflict)

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
LI element to that UL element:

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
You ca pass some overriding attributes to be applied to the new element as well:

```js
$('#existing-element').clone({"id" : "new-element"}).appendTo('#my-div');
```

[Top](#basic-usage)

### CSS manipulation

CSS manipulation is another common core feature set. You can set CSS rules
individually or you can set many at once in a group:

```js
$('#my-div').css('background-color', '#fff');

$('#my-div').css({
    "margin"  : "10px",
    "padding" : "10px",
    "width"   : "200px",
    "height"  : "80px"
});
```

Of course, you can retrieve css values like this:

```js
var divHeight = $('#my-div').css('height');
```

[Top](#basic-usage)
