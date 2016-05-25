var Events = require("events");

// A Beautiful Model
// -----------------

function Model(){
  this.events = new Events();
}

// Public API
// ----------

Model.prototype.on = function(...args){
  this.events.addListener(...args);
};

Model.prototype.trigger = function(...args){
  this.events.emit(...args);
};

// Dynamic Attributes
// ------------------

Model.prototype = new Proxy(Model.prototype, {
  set: function(target, name, value){
    var created = !(name in target);

    target[name] = value;

    if (created){
      target.trigger("create:" + name, value);
    }
    target.trigger("change:" + name, value);
  }
});

// Exports
// -------

module.exports = Model;
