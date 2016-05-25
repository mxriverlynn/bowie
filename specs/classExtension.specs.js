var td = require("testdouble");
var Bowie = require("../lib");

describe("class extending bowie model", function(){

  describe("when extending a Bowie Model with a class", function(){
    class Foo extends Bowie.Model { }

    var f, created;

    beforeEach(function(){
      created = td.function("create:bar");

      f = new Foo({
        baz: "quux"
      });

      f.on("create:bar", created);

      f.bar = "baz";
    });

    it("should handle dynamic attributes", function(){
      td.verify(created("baz"));
    });

    it("should handle data passed in through constructor", function(){
      expect(f.baz).toBe("quux");
    });
  });

  describe("when adding a method to a Bowie class, and calling it", function(){
    class Foo extends Bowie.Model {
      doStuff() {
        return "something";
      }
    }

    var result;

    beforeEach(function(){
      var f = new Foo();

      result = f.doStuff();
    });

    it("should call the method appropriately", function(){
      expect(result).toBe("something");
    });
  });

});
