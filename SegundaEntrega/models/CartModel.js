const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  timestamp: { type: String, required: true},
  products: []
});
const CartModel = model('Carritos', productSchema);

module.exports = CartModel; //(exportando el modulo)
