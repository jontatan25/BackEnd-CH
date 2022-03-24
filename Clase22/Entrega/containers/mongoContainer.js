const mongoose = require("mongoose");
// MODELS
const ProductModel = require("../models/ProductModel");
const MessageModel = require("../models/MsModel");

const URL = "mongodb://localhost:27017/ecommerce";

let container = [];
let containerMsg = []

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
        socketId: product.socketId,
        name: product.name,
        url: product.url,
        price: product.price,
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
      console.log(`Base de datos connectada en ${URL} `);
      const getProducts = await ProductModel.find({});
      let doc = getProducts.find((product) => product.id === id);
      console.log(doc);
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async update() {
    try {
      let resultado = await ProductModel.updateOne(
        { socketId: 3 },
        { $set: { price: 100 } }
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
      let resultado = await ProductModel.deleteOne({ id: id });
      console.log(resultado);
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
