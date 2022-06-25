import { Schema, model } from "mongoose";

const productSchema = new Schema({

  timestamp: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigo: { type: String, required: true },
  foto: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
});
const ProductModel = model('products', productSchema);

export default ProductModel; //(exportando el modulo)
