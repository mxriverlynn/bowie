# Bowie: Beautiful Models, With ES6 Style

Bowie is an experiment in building agnostic models with a 
beautiful API, elegant features and a unique ES6 implementation.

This is truly an experiment. You've been warned.

## Getting Started

At this time, Bowie requires Node.js v6 or higher. I may add
a Babel / Broswerify build at some point, but I'm trying to
keep it simple for now.

0. `npm install bowie`
0. `var Bowie = require("bowie");`
0. `var model = new Bowie.Model();`

From here, you can see code examples below.

## Running Tests

If you want to run the tests, follow these steps:

0. Clone the bowie repository
0. `npm install` from the project root folder
0. `npm install -g grunt-cli` if you don't already have grunt-cli
0. `grunt` to start the watcher / runner, or `grunt-specs` to just run the tests

If you run `grunt` with the watcher, any time you save a file in the `lib` or
`specs` folder, the specs will run again.

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

### Child Objects

Bowie models have some built-in support for child models, directly.
For example, if you assign an object value to an attribute, Bowie
will check to see if it is already a Model instance. If not, it will
wrap the value in a Model instance for you.

```js
var parent = new Bowie.Model();

var child = {
  baz: "quux"
};

// child gets wrapped, here
parent.child = child;

parent.child.on("change:baz", function(value){
  console.log("new value:", value);
});

parent.child.baz = "fun"; // => console logs "new value: fun"
```

### Assign Attribute On Creation

Pass an object literal into the Bowie.Model constructor and the data
will be stored as the model's attributes.

```js
var m = new Model({
  foo: "bar"
});

console.log(m.foo) // => "bar"
```

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

The process of serializing when calling `.toJSON` 
ensures a clean copy of all attributes, with no direct
reference back to the underlying attribute storage.

Child models will also be included in the `.toJSON` output.

## Dynamic Methods

You can add methods directly to any Model instance - whether it extended
as a class (see below), or just created a new Bowie.Model directly.

```js
var m = new Bowie.Model({
  bar: "baz"
});

m.foo = function(){
  return this.bar + " WUUUUT";
};

m.foo(); // => "baz WUUUUT"
```

## Class Extension

Bowie supports full `class` exension, including the ability to provide
methods on the class.

```js
class Foo extends Bowie.Model {
  
  doStuff(baz){
    return this.bar + baz + this.quux;
  }

}

// create the model with a base set of data
var f = new Foo({
  bar: 1
});

// add more data attributes
f.quux = 3;

// process the data
f.doStuff(2); // => 6
```

## Legal Junk

Copyright &copy;2016 Muted Solutions, LLC. All Rights Reserved.

Distributed under [MIT License](http://mutedsolutions.mit-license.org).
