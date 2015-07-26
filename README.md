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
other similar JavaScript libraries.

It provides a set of built-in tools to create, select and manipulate
various DOM elements.

INSTALL
-------

Installation is as easy as including it in your web project's source code.

## BASIC USAGE

Here are some common use cases and examples: 

* [DOM selection](#dom-selection)
* [CSS manipulation](#css-manipulation)
* [Events](#events)
* [Effects](#effects)
* [AJAX](#ajax)

### DOM selection

Of course, DOM selection is one of the most common features of any JS library.

```js
var li = $('#my-list > li');

for (var i = 0; i < li.length; i++) {
    console.log(li[i].innerHTML);
}
```

[Top](#basic-usage)