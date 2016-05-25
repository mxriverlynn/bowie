var td = require("testdouble");
var Bowie = require("../lib");

describe("attributes", function(){

  describe("when assigning a value to anon-existent attribute, in a model", function(){
    var created, changed;
    var assignedVal = "some value";

    beforeEach(function(){
      var model = new Bowie.Model();
      
      created = td.function("created");
      changed = td.function("changed");

      model.on("create:testAttribute", created);

      model.on("change:testAttribute", changed);

      model.testAttribute = assignedVal;
    });

    it("should trigger a 'create' event for the attribute", function(){
      td.verify(created(assignedVal));
    });

    it("should trigger a 'change' event for the attribute", function(){
      td.verify(changed(assignedVal));
    });
  });

  describe("when getting the toJSON representation of the model", function(){
    var json;

    beforeEach(function(){
      var m = new Bowie.Model();
      m.foo = "bar";
      m.baz = "quux";

      json = m.toJSON();
    });

    it("should include all of the dynamic attributes", function(){
      expect(json.foo).toBe("bar");
      expect(json.baz).toBe("quux");
    });

  });

  describe("when passing an object with data to the model constructor", function(){
    var m;

    beforeEach(function(){
      m = new Bowie.Model({
        foo: "bar"
      });
    });

    it("should provide the data in the model's attributes", function(){
      expect(m.foo).toBe("bar");
    });
  });

});
