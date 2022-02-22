const express = require("express");
const Contenedor = require("../Contenedor");
const contenedor = new Contenedor("./productos.JSON");
const { Router } = express;
const productosRouter = Router();

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
  const productos = await contenedor.getAll();
  res.send({
    message: "Success",
    data: productos,
  });
});

productosRouter.get("/:id", async (req, res) => {
  const productById = await contenedor.getById(req.params.id);
  if (!productById) {
    res.send({
      error: `"El producto con el id # ${req.params.id} no existe"`,
    });
  } else res.send(productById);
});

productosRouter.post("/", async (req, res) => {
  const checkAdmin = await contenedor.checkAdmin();
  if (checkAdmin) {
    const saveProduct = await contenedor.save(req.body);

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
  if (checkAdmin) {
    const productoID = req.body;
    productInfo= [{id:req.params.id, product: productoID}]
    const productUpdate = await contenedor.update(productInfo);

    if (!productUpdate) {
      res.send({
        message: "Product Updated",
        data: productUpdate,
      });
    } else
      res.send({
        message: "Operation Complete",
        data: productUpdate,
      });
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

productosRouter.delete("/:id", async (req, res) => {
  const productDelete = await contenedor.deleteById(req.params.id);

  if (!productDelete) {
    res.send({
      error: `"El producto con el id # ${req.params.id} no existe"`,
    });
  } else res.send(productDelete);
});

module.exports = productosRouter;
