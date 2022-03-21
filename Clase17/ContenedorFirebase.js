var admin = require("firebase-admin");

var serviceAccount = require("./backendbase-fdeb2-firebase-adminsdk-2vw32-6dd03894ad.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async saveMessage(product) {
    try {
      let doc = query.doc();
      await doc.create({
        email: product.email,
        text: product.text,
        time: product.time,
      });

      console.log("Datos insertados");
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const querySnapshot = await query.get();
      return querySnapshot.docs.map(doc => doc.data());
    } catch (error) {
      console.log(error);
    }
  }

  async update(id) {
    try {
      const doc = query.doc(id);
      const item = await doc.update({ dni: "111111" });
      console.log("Updated");
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const doc = query.doc(id);
      const item = await doc.delete();
      console.log("se ha borrado" + item);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const querySnapshot = await query.get();
      let docs = querySnapshot.docs;
      // Since there is no function to delete all the Docs I have to traverse the array and delete them 1 by 1
      docs.forEach((element) => {
        deleteId();
        async function deleteId() {
          try {
            const doc = query.doc(element.id);
            await doc.delete();
            console.log("document deleted");
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
