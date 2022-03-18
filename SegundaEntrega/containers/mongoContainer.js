const mongoose = require("mongoose");
// MODELS
const ProductModel = require("../models/ProductModel");
const MessageModel = require("../models/CartModel");

const URL = "mongodb://localhost:27017/ecommerce";

let container = [];
let containerMsg = [];

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  // PRODUCTS
  async saveProduct(product) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const prod1 = new ProductModel({
        timestamp: date.now(),
        nombre: product.nombre,
        descripcion: product.descripcion,
        codigo: product.codigo,
        foto: product.foto,
        precio: product.precio,
        stock: product.stock,
      });
      await prod1.save();
      console.log("Documento Guardado");
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
      let getProducts = await ProductModel.find({});

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
      const getProducts = await ProductModel.find({ _id: id });
      return getProducts;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async update(newProduct) {
    try {
     
      await mongoose.connect(URL);
      await ProductModel.updateOne(
        { _id: newProduct.id },
        { $set: { precio: newProduct.precio} }
      );
console.log(newProduct)
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async deleteById(id) {
    try {
      await mongoose.connect(URL);
      await ProductModel.deleteOne({ _id: id });
      
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }

  // MESSAGES

  async saveMessage(message) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const newMessage = new MessageModel({
        email: message.email,
        text: message.text,
        time: message.time,
      });
      await newMessage.save();
      console.log("Message saved");
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }

  async getAllMessages() {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      let getMessages = await MessageModel.find({});

      getMessages.map((message) => containerMsg.push(message));
      console.log("Messages had been adquired");
      return containerMsg;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
}

module.exports = Contenedor;
