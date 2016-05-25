var Bowie = require("../lib");

describe("model methods", function(){

  describe("when a method is added to a model, and then called", function(){
    var result;

    beforeEach(function(){
      var m = new Bowie.Model();

      m.foo = function(){
        return "something";
      };

      result = m.foo();
    });

    it("should execute the method", function(){
      expect(result).toBe("something");
    });
  });

});
