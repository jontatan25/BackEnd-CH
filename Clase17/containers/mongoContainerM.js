const mongoose = require("mongoose");
// MODELS
const ProductModel = require("../models/ProductModel");
const MessageModel = require("../models/MsModel");

const URL = "mongodb://localhost:27017/ecommerce";

let container = [];
let containerMsg = [];

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  // PRODUCTS
  async saveMessage(product) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const prod1 = new MessageModel({
        email: product.email,
        text: product.text,
        time: product.time,
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
  async getbyId(id) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const getProducts = await ProductModel.find({id:id});
      let doc = getProducts.find((product) => product.id === id);
      return doc;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async update(id, value) {
    try {
      await mongoose.connect(URL);

      let resultado = await ProductModel.updateOne(
        { id: id },
        { $set: { value: value } }
      );
      console.log(resultado);
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async deleteById(id) {
    try {
      await mongoose.connect(URL);
      let resultado = await ProductModel.deleteOne({ id: id });
      console.log(resultado);
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }

  // MESSAGES

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
