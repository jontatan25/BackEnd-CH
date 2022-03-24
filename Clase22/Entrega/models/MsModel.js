const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  id: { type: String, required: true },
  messages: []
});
const ProductModel = model('messages', productSchema);

module.exports = ProductModel; //(exportando el modulo)
