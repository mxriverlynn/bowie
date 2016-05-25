var Events = require("events");

// private storage keys
// --------------------

const ATTRIBUTE_KEY = Symbol("Bowie.Model.Attributes");

// A Beautiful Model
// -----------------

function Model(data = {}){
  this[ATTRIBUTE_KEY] = data;
  this.events = new Events();
  return proxyAttributes(this);
}

// Public API
// ----------

Model.prototype.on = function(...args){
  this.events.addListener(...args);
};

Model.prototype.trigger = function(...args){
  this.events.emit(...args);
};

Model.prototype.toJSON = function(){
  return JSON.parse(JSON.stringify(this[ATTRIBUTE_KEY]));
};

// Dynamic Attributes
// ------------------

function proxyAttributes(model){
  return new Proxy(model, {
    get: getAttributeValue,
    set: setAttributeValue
  });
}

function getAttributeValue(target, name){
  var value;

  // check for attr in model, first
  var isModelAttr = !!(name in target);
  if (isModelAttr) {
    value = target[name];
  } else {
    // check the attributes list for the model data
    var hasValue = !!(name in target[ATTRIBUTE_KEY]);
    if (hasValue){
      value = target[ATTRIBUTE_KEY][name];
    }
  }

  // send back what we found, if anything
  return value;
}

function setAttributeValue(target, name, value){
  var created = !(name in target);

  var isFunction = (typeof value === "function");
  var isObject = (value instanceof Object);
  var isModel = (value instanceof Model);

  // only wrap the value in a Bowie Model if it is
  // an object, not already a Model, and not a function
  if (isObject && !isModel && !isFunction){
    value = new Model(value);
  }

  // determine storage location of the value, based
  // on the type of the value
  if (isFunction){
    // store the function on the object, directly
    target[name] = value;
  } else {
    // store the value in the attribute list
    target[ATTRIBUTE_KEY][name] = value;
  }

  // only trigger created & change events for attributes / children
  if (!isFunction){
    if (created){ target.trigger("create:" + name, value); }
    target.trigger("change:" + name, value);
  }
}

// Exports
// -------

module.exports = Model;
