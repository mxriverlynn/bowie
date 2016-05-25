var td = require("testdouble");
var Bowie = require("../lib");

describe("core extension", function(){

  describe("when extending from Model", function(){
    var staticFoo, instanceFoo;

    beforeEach(function(){
      staticFoo = td.function("static");
      instanceFoo = td.function("instance");

      var staticMethods = { staticFoo };
      var instanceMethods = { instanceFoo };

      var M = Bowie.Model.extend(instanceMethods, staticMethods);

      var m = new M();
      M.staticFoo();
      m.instanceFoo();
    });

    it("should allow static methods to be defined", function(){
      td.verify(staticFoo());
    });

    it("should allow instance methods to be defined", function(){
      td.verify(instanceFoo());
    });
  });

  describe("when extending from Model and adding to the prototype and instance", function(){
    var M = Bowie.Model.extend();

    var fn, created, baz;
    beforeEach(function(){
      baz = td.function("baz");
      created = td.function("created");
      fn = td.function("foo");
      M.prototype.foo = fn;

      var m = new M();

      m.on("create:bar", created);
      
      m.foo();

      m.baz = baz;
      m.bar = "baz";

      m.baz();
    });

    it("should be able to execute the function, as expected", function(){
      td.verify(baz());
      td.verify(fn());
    });

    it("should handle dynamic attributes", function(){
      td.verify(created("baz"));
    });
  });

});
