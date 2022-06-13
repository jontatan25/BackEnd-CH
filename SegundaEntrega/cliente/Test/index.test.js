const { get, del, add, put } = require("../index");
var assert = require("assert");

describe("Test de API", function () {
  it("comprobar que los item se añaden y se adquieren", function () {
    get();
    assert.strictEqual(get().length, 0);
  });
  add({id:1, producto:"Producto"});
  get();
  assert.strictEqual(get().length, 1);
  it("comprobar que los item se modifican", function () {
    put({id:1, producto:"Nuevo Producto"});
    assert.deepStrictEqual(get(),[{id:1, producto:"Nuevo Producto"}]);
  });
  
  it("comprobar que los item se borran", function () {
    del({id:1, producto:"Nuevo Producto"});
    assert.strictEqual(get().length, 0);
  });
});


