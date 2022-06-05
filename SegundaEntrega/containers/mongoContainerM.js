const mongoose = require("mongoose");
// MODELS

const MessageModel = require("../models/MsModel");
const UserModel = require("../models/userModel");

const URL = "mongodb://localhost:27017/ecommerce";
const AtlasUrl = "mongodb+srv://zamiipx:Fishman2@cluster0.rjl6p.mongodb.net/users?retryWrites=true&w=majority"

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// SETTING SCHEMA
const commentSchema = new schema.Entity("messages");
const schemaAutor = new schema.Entity("author");
const mySchema = new schema.Array({
  author: schemaAutor,
  comments: [commentSchema],
});

let container = [];
let containerMsg = [];

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  // PRODUCTS

  async createContainer() {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const prod1 = new MessageModel({
        id: "msg",
        messages: [],
      });
      await prod1.save();
      console.log("Documento Guardado");
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
  async saveFirstMessage(userInfo) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      const prod1 = new MessageModel({
        id: "1",
        messages: [],
      });
      await prod1.save();
      console.log("Nuevo Chat Creado");
      await MessageModel.findOneAndUpdate(
        { id: "1" },
        {
          $push: {
            messages: userInfo,
          },
        },
        { new: true, safe: true, upsert: true }
      );

      // NORMALIZING

      let getProducts = await MessageModel.findOne({ id: "1" });
      const normalizedChat = normalize(getProducts.messages, mySchema);

      // console.log("********************************************");
      // console.log(JSON.stringify(getProducts.messages).length);
      // console.log(getProducts.messages);
      // console.log("********************************************");
      // console.log(normalizedChat);
      // console.log("Normalizado :", JSON.stringify(normalizedChat).length);

      return normalizedChat;
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
  async saveMessage(userInfo) {
    try {
      await mongoose.connect(URL);
      console.log(`Base de datos connectada en ${URL} `);
      await MessageModel.findOneAndUpdate(
        { id: "1" },
        {
          $push: {
            messages: userInfo,
          },
        },
        { new: true, safe: true, upsert: true }
      );

      // NORMALIZING

      let getProducts = await MessageModel.findOne({ id: "1" });
      const normalizedChat = normalize(getProducts.messages, mySchema);

      // console.log("********************************************");
      // console.log(JSON.stringify(getProducts.messages).length);
      // console.log(getProducts.messages);
      // console.log("********************************************");
      // console.log(normalizedChat);
      // console.log("Normalizado :", JSON.stringify(normalizedChat).length);
      return normalizedChat;
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
      let getProducts = await MessageModel.find({});

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
      const getProducts = await MessageModel.find({ id: id });
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

      let resultado = await MessageModel.updateOne(
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
      let resultado = await MessageModel.deleteOne({ id: id });
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
      let getProducts = await MessageModel.findOne({ id: "1" });
      if (getProducts){
        const normalizedChat = normalize(getProducts.messages, mySchema);
        return normalizedChat;
      }
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
  async saveUser(user) {
    try {
      await mongoose.connect(AtlasUrl);
      console.log("mongo"+user)
      const prod1 = new UserModel({
        name: user.name
      });
      await prod1.save();
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
}

module.exports = Contenedor;