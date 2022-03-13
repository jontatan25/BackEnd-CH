const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  socketId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  url: { type: String, required: true },
});
const ProductModel = model('products', productSchema);

module.exports = ProductModel; //(exportando el modulo)
