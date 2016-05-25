var Bowie = require("../lib");

describe("class extending bowie model", function(){

  describe("when extending a Bowie Model with a class", function(){
    class Foo extends Bowie.Model {}

    var createSpy;

    beforeEach(function(){
      createSpy = jasmine.createSpy("create:bar");
      var f = new Foo();

      f.on("create:bar", createSpy);

      f.bar = "baz";
    });

    it("should handle dynamic attributes", function(){
      expect(createSpy).toHaveBeenCalledWith("baz");
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
