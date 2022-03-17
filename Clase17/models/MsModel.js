const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  email: { type: String, required: true },
  text: { type: String, required: true },
  time: { type: String, required: true },
});
const ProductModel = model('messages', productSchema);

module.exports = ProductModel; //(exportando el modulo)
