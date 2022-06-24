/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: { type: "string", required: true },
    descripcion: { type: "string", required: true },
    timestamp: { type: "number", required: true },
    codigo: { type: "number", required: true},
    photoUrl: { type: "string", defaultsTo: "no photo available" },
    price: { type: "number", required: true },
    photoUrl: { type: "string", defaultsTo: "no photo available" },
    stock: { type: "number", required: true },

  },
};
