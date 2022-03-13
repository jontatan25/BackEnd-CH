const mongoose = require('mongoose');
const ProductModel = require('../models/ProductModel');

const URL = 'mongodb://localhost:27017/ecommerce'

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async saveProduct(product) {
    try {
      await mongoose.connect(URL)
        .then(async () => {
          try {
            console.log(`Base de datos connectada en ${URL} `);
            const prod1 = new ProductModel({
              socketId: product.socketId,
              name: product.name,
              url: product.url,
              price: product.price,
            });
            await prod1.save();
            console.log('Documento Guardado');
          } catch (error) {
            console.log(`Server error: ${error}`);
          } finally {
            mongoose.disconnect().catch((error) => console(error));
          }
        })
        .catch((err) => console.log(`Server error: ${err}`));
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      mongoose.disconnect().catch((error) => console(error));
    }
  }
  async getAll() {
    let doc = null;
    try {
      mongoose
        .connect(URL)
        .then(async () => {
          try {
            console.log(`Base de datos connectada en ${URL} `);
            let doc = await ProductModel.find();
            return doc
          } catch (error) {
            console.log(`Server error: ${error}`);
          } finally {
            mongoose.disconnect().catch((error) => console(error));
          }
        })
        .catch((err) => console.log(`Server error: ${err}`));
        return doc
    } catch (error) {
      console.log(`Server error: ${error}`);
    }
    return doc;
  }
  async getbyId(id) {
    try {
      console.log(`Base de datos connectada en ${URL} `);
      const getProducts = await ProductModel.find();
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
}

module.exports = Contenedor;
