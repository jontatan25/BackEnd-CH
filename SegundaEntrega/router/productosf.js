const express = require("express");
const Contenedor = require("../Contenedor");
const contenedor = new Contenedor("./productos.JSON");
const { Router } = express;
const productosRouterf = Router();

const ContenedorF = require("../containers/firebase");
const contenedorFire = new ContenedorF("CartFirebase");



productosRouterf.get("/admin", async (req, res) => {
  const checkAdmin = await contenedor.checkAdmin();
  if (checkAdmin) {
    res.send({
      message: "Success",
      data: checkAdmin,
    });
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

// FIREBASE

productosRouterf.get("/", async (req, res) => {
    const productos = await contenedorFire.getAll();
    res.send({
      message: "Success",
      data: productos,
    });
});

productosRouterf.get("/:id", async (req, res) => {
    const productById = await contenedorFire.getById(req.params.id);
    if (!productById) {
      res.send({
        error: `"El producto con el id # ${req.params.id} no existe"`,
      });
    } else res.send(productById);
});

productosRouterf.post("/", async (req, res) => {
    const checkAdmin = await contenedor.checkAdmin();
    if (checkAdmin) {
      const saveProduct = await contenedorFire.saveProduct(req.body);
  
      res.send({
        message: "Product has been posted",
        Product: saveProduct,
      });
    } else {
      res.send({ error: -1, message: "Acceso Denegado" });
    }
});

productosRouterf.put("/:id", async (req, res) => {
  const checkAdmin = await contenedor.checkAdmin();
  const producto = req.body;
  let newProduct = { id: req.params.id, ...producto };

  if (checkAdmin) {
    const productById = await contenedorFire.getById(req.params.id);
    if (!productById) {
      res.send({
        error: `"El producto con el id # ${req.params.id} no existe"`,
      });
    } else {
      await contenedorFire.update(newProduct)
        res.send({
          message: `"El producto con el id # ${req.params.id} ha sido Actualizado"`,
        })
    }
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

productosRouterf.delete("/:id", async (req, res) => {

  const checkAdmin = await contenedor.checkAdmin();

  if (checkAdmin) {
    const productById = await contenedorFire.getById(req.params.id);
    if (!productById) {
      res.send({
        error: `"El producto con el id # ${req.params.id} no existe"`,
      });
    } else {
      await contenedorFire.deleteById(req.params.id)
      res.send({
        message: `"El producto con el id # ${req.params.id}" ha sido borrado`,
      });
      ;
    }
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});


module.exports = productosRouterf;
