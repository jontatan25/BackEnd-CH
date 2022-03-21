const mongoose = require("mongoose");
// MODELS
const ProductModel = require("../models/ProductModel");
const CartModel = require("../models/CartModel");

const URL = "mongodb://localhost:27017/ecommerce";

let container = [];
let containerMsg = [];

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  // CARTS
  async saveCart() {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const cart1 = new CartModel({
        timestamp: Date.now(),
        products: [
          {
            timestamp: "empty",
            nombre: "empty",
            descripcion: "empty",
            codigo: "empty",
            foto: "empty",
            precio: 0,
            stock: 0,
          },
        ],
      });
      await cart1.save();
      console.log("Documento Guardado");
      return cart1._id;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
  async getAll() {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      let getProducts = await CartModel.find({});

      getProducts.map((product) => container.push(product));
      console.log("Products had been adquired");
      return container;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
  async getById(id) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const getProducts = await CartModel.find({ _id: id });
      return getProducts;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  
  async deleteProductById(id) {
    try {
      await mongoose.connect(URL);
      await CartModel.deleteOne({ _id: { id } });
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }

  // PRODUCTS

  async saveProduct() {
    try {
      await mongoose.connect(URL);
      const getProducts = await CartModel.find({ _id: "62347fac25d2e1b6c1e49459"});
     
      console.log(getProducts)
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
}

module.exports = Contenedor;
