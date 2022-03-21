const express = require("express");
const Contenedor = require("../Contenedor");
const contenedor = new Contenedor("./productos.JSON");
const { Router } = express;
const carritoRouterf = Router();

const ContenedorF = require("../containers/firebase");
const contenedorCart = new ContenedorF("CartFirebase");

carritoRouterf.get("/admin", async (req, res) => {
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

carritoRouterf.get("/", async (req, res) => {
  const products = await contenedorCart.getAll();
  if (!products) {
    res.send({
      error: "No hay Carros creados",
    });
  } else res.send(products);
});

carritoRouterf.post("/", async (req, res) => {
  const newCart = {};
  const idProducto = await contenedorCart.saveCart();

  res.send({
    message: "Success",
    ...newCart,
    id: idProducto,
  });
});

carritoRouterf.delete("/:id", async (req, res) => {
  const checkAdmin = await contenedor.checkAdmin();

  if (checkAdmin) {
    const productById = await contenedorCart.getCartById(req.params.id);
    if (!productById) {
      res.send({
        error: `"El producto con el id # ${req.params.id} no existe"`,
      });
    } else {
      await contenedorCart.deleteCartById(req.params.id);
      res.send({
        message: `"El producto con el id # ${req.params.id}" ha sido borrado`,
      });
    }
  } else {
    res.send({ error: -1, message: "Acceso Denegado" });
  }
});

carritoRouterf.get("/:id/productos", async (req, res) => {
  const getCart = await contenedorCart.getCartById(req.params.id);
  if (!getCart) {
    res.send({
      error: "No hay Carros creados",
    });
  } else res.send(getCart);
});
carritoRouterf.post("/:id/productos", async (req, res) => {
    const newItem = {id: req.params.id, content: req.body}
  await contenedorCart.saveProductCart(newItem);
  res.send({Message: "Producto agregado",})
});
module.exports = carritoRouterf;

carritoRouterf.delete("/:id/productos/:productId", async (req, res) => {
    const checkAdmin = await contenedor.checkAdmin();
  
    if (checkAdmin) {
      const productById = await contenedorCart.getCartById(req.params.id);
      if (!productById) {
        res.send({
          error: `"El producto con el id # ${req.params.id} no existe"`,
        });
      } else {
        const deleteInfo = {id: req.params.id, idProd: req.params.productId}
        await contenedorCart.deleteProductCart(deleteInfo);
        res.send({
          message: `"El producto con el id # ${req.params.id}" ha sido borrado`,
        });
      }
    } else {
      res.send({ error: -1, message: "Acceso Denegado" });
    }
  });