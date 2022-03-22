const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  timestamp: { type: String, required: true },
  products: [],
});
const CartModel = model("Carritos", cartSchema);

module.exports = CartModel; //(exportando el modulo)
