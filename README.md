<div style="display:inline">

[![build](https://travis-ci.org/Sylvain59650/htmlElement-shortcut.png?branch=master)](https://travis-ci.org/Sylvain59650/htmlElement-shortcut)
![version](https://img.shields.io/npm/v/htmlElement-shortcut.svg)
![package](https://img.shields.io/github/package-json/v/Sylvain59650/htmlElement-shortcut.svg)
![dependencies](https://img.shields.io/david/Sylvain59650/htmlElement-shortcut.svg)
![minified](https://img.shields.io/bundlephobia/min/htmlElement-shortcut.svg)
![linter](https://img.shields.io/badge/eslint-ok-blue.svg)
![tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)
![license](https://img.shields.io/npm/l/htmlElement-shortcut.svg)
[![hits](http://hits.dwyl.com/Sylvain59650/htmlElement-shortcut.svg)](http://hits.dwyl.com/Sylvain59650/htmlElement-shortcut)
</div>


 <div class="Note" style="color:orange;font-style:italic">
 
The lastest version of this document is available on [Github > htmlElement-shortcut](https://github.com/Sylvain59650/htmlElement-shortcut/blob/master/README.md)
</div>

# HTMLElement-Shortcut

    Allows you to associate a keyboard shortcut with an HTML element (input, textarea, document, etc.).

    The keyboard shortcut on an element can be propagated to its parent elements or not.

## Installation

    npm install htmlElement-shortcut --save

or

    yarn add htmlElement-shortcut --save


## prerequisites

### for browser

    <script src="node_modules/htmlElement-shortcut/distrib/htmlElement-shortcut.min.js"></script>


## Availables operations
    - shortcut
    - unshortcut

## usage

    <input id="t1" type="text" />
    <input id="t2" type="text" />

    <script>
    document.querySelector("#t1").shortcut("ctrl+F1", function() {
        alert("ctrl+F1 on input t1");
        }, false);

    document.querySelector("#t2").shortcut("ctrl+F1", function() {
        alert("ctrl+F1 on input t2");
        }, false);
    
    document.querySelector("#t2").shortcut("alt+G", function() {
        alert("alt+G on input t2");
        }, false);
    </script>