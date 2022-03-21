var admin = require("firebase-admin");

var serviceAccount = require("./eshop-7b327-firebase-adminsdk-lnhsf-feaced9028.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const query = db.collection("products");
const cartQuery = db.collection("carts");

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    try {
      const querySnapshot = await query.get();
      return querySnapshot.docs.map((doc) => doc.data());
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      const doc = query.doc(id);
      const item = await doc.get();
      return item.data();
    } catch (error) {
      console.log(error);
    }
  }

  async saveProduct(product) {
    try {
      let doc = query.doc();
      await doc.create({
        timestamp: Date.now(),
        nombre: product.nombre,
        descripcion: product.descripcion,
        codigo: product.codigo,
        foto: product.foto,
        precio: product.precio,
        stock: product.stock,
      });

      console.log("Datos insertados");
    } catch (error) {
      console.log(error);
    }
  }

  async update(newProduct) {
    try {
      const doc = query.doc(newProduct.id);
      const item = await doc.update({
        precio: newProduct.precio,
        foto: newProduct,
        codigo: newProduct.codigo,
        stock: newProduct.stock,
        descripcion: newProduct.descripcion,
        timestamp: Date.now(),
        nombre: newProduct.nombre,
      });
      return item;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const doc = query.doc(id);
      await doc.delete();
      console.log("se ha borrado el item");
    } catch (error) {
      console.log(error);
    }
  }

  // CARRITOS

  async saveCart() {
    try {
      cartQuery
        .add({ Cart: [{ listId: 0, product_id: 0 }] })
        .then(function (docRef) {
          console.log("Document written with ID: ", docRef.id);
          return docRef.id;
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getCartById(id) {
    try {
      const doc = cartQuery.doc(`${id}`);
      const item = await doc.get();
      return item.data();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCartById(id) {
    try {
      const doc = cartQuery.doc(id);
      await doc.delete();
      console.log("se ha borrado el item");
    } catch (error) {
      console.log(error);
    }
  }
  async saveProductCart(newItem) {
    try {
      const getDoc = cartQuery.doc(newItem.id); // INSERTAR ID
      const getProducts = await getDoc.get();
      const getData = getProducts.data();
      // UPDATING
      getData.Cart[0].product_id += 1;
      newItem.content.productId = getData.Cart[0].product_id;
      getData.Cart.push(newItem.content);

      // SAVING

      await getDoc.update({
        Cart: getData.Cart,
      });
      console.log("Producto agregado");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProductCart(deleteInfo) {
    try {
      const getDoc = cartQuery.doc(deleteInfo.id);
      const getProducts = await getDoc.get();
      const getData = getProducts.data();
      // UPDATING
      const newArr =  getData.Cart.filter((item) => item.productId !== parseInt(deleteInfo.idProd));

      // SAVING
    //   await getDoc.update({
    //     Cart: getData.Cart,
    //   });
      console.log("Producto Borrado");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
