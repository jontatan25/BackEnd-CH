const express = require("express");
const Contenedor = require("../Contenedor");
const contenedor = new Contenedor("./productos.JSON");
const { Router } = express;
const productosRouter = Router();

const Contenedorm = require("../containers/mongoContainer");
const contenedorProducts = new Contenedorm("products");

productosRouter.get("/admin", async (req, res) => {
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

productosRouter.get("/", async (req, res) => {
  const productos = await contenedorProducts.getAll();
  res.send({
    message: "Success",
    data: productos,
  });
});

productosRouter.get("/:id", async (req, res) => {
  const productById = await contenedorProducts.getById(req.params.id);
  if (!productById) {
    res.send({
      error: `"El producto con el id # ${req.params.id} no existe"`,
    });
  } else res.send(productById);
});

productosRouter.post("/", async (req, res) => {
  const checkAdmin = await contenedor.checkAdmin();
  if (checkAdmin) {
    const saveProduct = await contenedorProducts.saveProduct(req.body);

    res.send({
      message: "Product has been posted",
      Product: saveProduct,
    });
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

productosRouter.put("/:id", async (req, res) => {
  const checkAdmin = await contenedor.checkAdmin();
  const producto = req.body;
  let newProduct = { id: req.params.id, ...producto };

  if (checkAdmin) {
    const productById = await contenedorProducts.getById(req.params.id);
    if (!productById) {
      res.send({
        error: `"El producto con el id # ${req.params.id} no existe"`,
      });
    } else {
      await contenedorProducts.update(newProduct)
        res.send({
          message: `"El producto con el id # ${req.params.id} ha sido Actualizado"`,
        })
    }
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

productosRouter.delete("/:id", async (req, res) => {

  const checkAdmin = await contenedor.checkAdmin();

  if (checkAdmin) {
    const productById = await contenedorProducts.getById(req.params.id);
    if (!productById) {
      res.send({
        error: `"El producto con el id # ${req.params.id} no existe"`,
      });
    } else {
      await contenedorProducts.deleteById(req.params.id)
      res.send({
        message: `"El producto con el id # ${req.params.id}" ha sido borrado`,
      });
      ;
    }
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

module.exports = productosRouter;
