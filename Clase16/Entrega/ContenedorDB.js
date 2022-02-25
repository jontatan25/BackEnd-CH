const { options } = require("./options/knexConfig");
const knex = require("knex")(options);

//   Getting the time for Timestamp
var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

class Contenedor {
  constructor(options, tableName) {
    this.options = options;
    this.tableName = tableName;
  }

  async getAll() {
    return await 
     knex
      .select("*")
      .from("cars")
      .then((rows) => {
        console.log(`table cars selected`);
        for (row of rows) {
          console.log(`${row["id"]}${row["name"]}${row["price"]}`);
        }
        
      })
      .catch((err) => {
        console.log(err);
        //   capturando el error
        throw err;
      })
      .finally(() => {
        //   liberar recursos, destruye la conexion
        knex.destroy();
      });
  
}
  async save(producto) {
    knex.schema
      .createTable(producto, (table) => {
        table.increments("id");
        table.string("name");
        table.integer("price");
      })
      .then(() => {
        console.log("table cars created");
      })
      .catch((err) => {
        console.log(err);
        //   capturando el error
        throw err;
      })
      .finally(() => {
        //   liberar recursos, destruye la conexion
        knex.destroy();
      });
  }

  async getById(numero) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const listaproductos = JSON.parse(contenido);
      const findProduct = listaproductos.findIndex((x) => x.id == numero);
      if (findProduct != -1) {
        return listaproductos[findProduct];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  async deleteById(numero) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const listaproductos = JSON.parse(contenido);
      const findProduct = listaproductos.findIndex((x) => x.id == numero);

      if (findProduct != -1) {
        listaproductos.splice(findProduct, 1);
        productos = listaproductos;
        const productoString = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile(`./${this.file}`, productoString);
        return listaproductos;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteAll() {
    try {
      const contenido = await fs.promises.writeFile(`./${this.file}`, "");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async update(productInfo) {
    const lista = await this.getAll();

    const getProductId = lista.findIndex(
      (item) => item.id === parseInt(productInfo[0].id)
    );
    const newProduct = productInfo[0];

    if (getProductId === -1) {
      console.error("no existe el elemento");
      return null;
    } else {
      const updatedProduct = {
        ...lista[getProductId],
        product: newProduct,
      };
      lista[getProductId] = updatedProduct;
      const productoString = JSON.stringify(lista, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productoString);
      return lista;
    }
  }
}

module.exports = Contenedor;
