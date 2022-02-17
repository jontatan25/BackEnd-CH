const fs = require("fs");

let productos = [];


//   Getting the time for Timestamp
var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async cartSave() {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const newCart = {};
      if (contenido === "") {
        newCart.cartId = 1;
        newCart.timestamp = dateTime;
        newCart.products = [];
        productos.push(newCart);
      } else {
        const listaproductos = JSON.parse(contenido);
        newCart.cartId = listaproductos.length + 1;
        newCart.timestamp = dateTime;
        newCart.products = [];
        listaproductos.push(newCart);
        productos = listaproductos;
      }

      const productoString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productoString);
      console.log("CartId = ", newCart.cartId);

      return newCart.cartId;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async save(producto) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");

      if (contenido === "") {
        producto.id = 1;
        producto.timestamp = dateTime;
        productos.push(producto);
      } else {
        const listaproductos = JSON.parse(contenido);
        producto.id = listaproductos.length + 1;
        producto.timestamp = dateTime;
        listaproductos.push(producto);
        productos = listaproductos;
      }

      const productoString = JSON.stringify(productos, null, 2);
      await fs.promises.writeFile(`./${this.file}`, productoString);
      console.log("id = ", producto.id);
      console.log("TimeStamp = ", producto.timestamp);
      return producto.id;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async saveProduct(cartItem) {
    try {
        const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
        const listaproductos = JSON.parse(contenido);
        const getCartById = listaproductos[cartItem.id - 1].products
        if (getCartById.length === 0) {
            cartItem.producto.id = 1;
            cartItem.producto.timestamp = dateTime;
            getCartById.push(cartItem.producto);
            productos = listaproductos;
        } else {
            cartItem.producto.id = getCartById.length + 1;
            cartItem.producto.timestamp = dateTime;
            getCartById.push(cartItem.producto);
            productos = listaproductos;
            
        }
        const productoString = JSON.stringify(productos, null, 2);
        await fs.promises.writeFile(`./${this.file}`, productoString);
        return listaproductos;
      } catch (error) {
        console.error("Error:", error);
      }
  }
  async getById(numero) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const listaproductos = JSON.parse(contenido);
      if (numero) {
        return listaproductos[numero - 1];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const listaproductos = JSON.parse(contenido);
      return listaproductos;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getAllProducts(id) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const listaproductos = JSON.parse(contenido);
      if (id) {
        return listaproductos[id - 1].products;
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
      if (numero) {
        listaproductos.splice([numero - 1], 1);
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
  async deleteByIdProd(itemInfo) {
    try {
      const contenido = await fs.promises.readFile(`./${this.file}`, "utf-8");
      const listaproductos = JSON.parse(contenido);
      const getCartId = itemInfo.id
      const getProductId = itemInfo.idProd

      if (listaproductos) {

        // Finding the Cart by cartId
        const findCart = listaproductos.findIndex(x => x.cartId == getCartId);
        // Finding the Product by Id
        const findProduct = listaproductos[findCart].products.findIndex(x => x.id == getProductId);
        // removing the Products From the Car
        listaproductos[findCart].products.splice([findProduct],1)
        
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

  async update(id, producto) {
    const lista = await this.getAll();
    const elementoGuardado = lista.find((item) => item.id === parseInt(id));
    const indiceElementoGuardado = lista.findIndex(
      (item) => item.id === parseInt(id)
    );

    if (!elementoGuardado) {
      console.error("no existe el elemento");
      return null;
    }

    const elementoActualizado = {
      ...elementoGuardado,
      ...producto,
    };

    lista[indiceElementoGuardado] = elementoActualizado;

    const productoString = JSON.stringify(lista, null, 2);
    await fs.promises.writeFile(`./${this.file}`, productoString);

    return elementoActualizado;
  }
}

module.exports = Contenedor;
