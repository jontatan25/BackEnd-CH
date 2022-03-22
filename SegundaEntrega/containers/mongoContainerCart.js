const mongoose = require("mongoose");
// MODELS
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
        products: [],
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
  async getAllProducts(cartId) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      let getProducts = await CartModel.find({ _id: cartId });

      const getArray = getProducts[0].products.map((product) => product);

      return getArray;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }

  async deleteById(id) {
    try {
      await mongoose.connect(URL);
      await CartModel.deleteOne({ _id: id });
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
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

  

  // PRODUCTS

  async saveProduct(cartItem) {
    try {
      await mongoose.connect(URL);

      const prod1 = {
        id: new mongoose.Types.ObjectId().toString(),
        timestamp: Date.now(),
        nombre: cartItem.producto.nombre,
        descripcion: cartItem.producto.descripcion,
        codigo: cartItem.producto.codigo,
        foto: cartItem.producto.foto,
        precio: cartItem.producto.precio,
        stock: cartItem.producto.stock,
      };
      const getProducts = await CartModel.findByIdAndUpdate(
        { _id: cartItem.id },
        {
          $push: {
            products: prod1,
          },
        },
        { new: true, safe: true, upsert: true }
      );

      console.log(getProducts);
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async deleteProductById(deleteInfo) {
    try {
      await mongoose.connect(URL);
      await CartModel.updateOne(
        { _id: deleteInfo[0].id},
        {$pull: {
            products:{ id: deleteInfo[0].idProd},
          },
        },{ safe: true, multi:false }
      );
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }

}

module.exports = Contenedor;
