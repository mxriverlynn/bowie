var Bowie = require("../lib");

describe("dynamic attributes", function(){

  describe("when assigning a value to anon-existent attribute, in a model", function(){
    var created, changed;
    var assignedVal = "some value";

    beforeEach(function(){
      var model = new Bowie.Model();

      model.on("create:testAttribute", function(value){
        created = value;
      });

      model.on("change:testAttribute", function(value){
        changed = value;
      });

      model.testAttribute = assignedVal;
    });

    it("should trigger a 'create' event for the attribute", function(){
      expect(created).toBe(assignedVal);
    });

    it("should trigger a 'change' event for the attribute", function(){
      expect(changed).toBe(assignedVal);
    });
  });

});
