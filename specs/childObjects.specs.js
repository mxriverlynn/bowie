var Bowie = require("../lib");

describe("child objects", function(){

  describe("when assigning an object to an attribute", function(){
    var m;

    beforeEach(function(){
      m = new Bowie.Model();

      m.foo = {
        baz: "quux"
      };
    });

    it("should wrap the object in a Bowie Model", function(){
      expect(m.foo instanceof Bowie.Model).toBe(true);
    });

    it("should contain existing data from the object", function(){
      expect(m.foo.baz).toBe("quux");
    });
  });

  describe("when changing an attribute on a wrapped child object", function(){
    var changeSpy;

    beforeEach(function(){
      var m = new Bowie.Model();

      m.foo = {
        baz: "quux"
      };

      changeSpy = jasmine.createSpy("change:baz");
      m.foo.on("change:baz", changeSpy);

      m.foo.baz = "a change";
    });

    it("should trigger the child's change event", function(){
      expect(changeSpy).toHaveBeenCalledWith("a change");
    });
  });

});
