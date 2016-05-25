# Bowie: Beautiful Models, With ES6 Style

Bowie is an experiment in building agnostic models with a 
beautiful API, elegant features and a unique ES6 implementation.

This is truly an experiment. You've been warned.

## Getting Started

0. `npm install bowie`
0. `var Bowie = require("bowie");`
0. `var model = new Bowie.Model();`

## Attributes

Bowie models use ES6 proxies to create a dynamic attribute setup.
You can add any attribute you wish, by assigning the attribute of the 
model, with no additional declaration.

```js
var m = new Bowie.Model();

m.foo = "bar";
```

When you do this, the Model proxy will provide a setter for the
attribute, which raises a `create` and `change` event.

```js
var m = new Bowie.Model();

m.on("create:foo", function(value){
  // the 'foo' attribute was created
});

m.on("change:foo", function(value){
  // the 'foo' attribute was changed
});
```

Note that the `create` event only fires when the attribute is
first created. The `change` event fires when the attribute is
created, or any time it is changed.

## Legal Junk

Copyright &copy;2016 Muted Solutions, LLC. All Rights Reserved.

Distributed under [MIT License](http://mutedsolutions.mit-license.org).
