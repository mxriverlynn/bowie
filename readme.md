# Bowie: Beautiful Models, With ES6 Style

Bowie is an experiment in building agnostic models with a 
beautiful API, elegant features and a unique ES6 implementation.

This is truly an experiment. You've been warned.

## Getting Started

0. `npm install bowie`
0. `var Bowie = require("bowie");`
0. `var model = new Bowie.Model();`

## Model Attributes

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

// make the assignment, and watch the events trigger
m.foo = "bar";
```

Note that the `create` event only fires when the attribute is
first created. The `change` event fires when the attribute is
created, or any time it is changed.

### Model toJSON

Bowie Models store data attributes in a private part of the
model instance, using ES6 Symbols. 

When calling `m.toJSON()`, the attributes from this private
storage are serialized into a JSON string then re-parsed into
a JavaScript object literal. 

```js
var m = new Bowie.Model();

m.foo = "bar";
m.baz = "quux";

var json = m.toJSON();

console.log(json); // => { foo: "bar", baz: "quux" }
```

The process of serializing / deserializing, when calling `.toJSON` 
ensures a clean copy of all attributes, with no direct
reference back to the underlying attribute storage.

## Legal Junk

Copyright &copy;2016 Muted Solutions, LLC. All Rights Reserved.

Distributed under [MIT License](http://mutedsolutions.mit-license.org).
