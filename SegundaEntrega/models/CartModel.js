const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  timestamp: { type: String, required: true},
  products: [{
    timestamp: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: String, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
  }]
});
const CartModel = model('Carritos', productSchema);

module.exports = CartModel; //(exportando el modulo)
