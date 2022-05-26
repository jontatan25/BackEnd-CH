const express = require("express");
const { Router } = express;
const carritoRouter = Router();
const port = parseInt(process.argv[2]) || 8082;
const capaCluster = require("../2Controlador/clusterNotPrimary");

const compression = require("compression");
carritoRouter.use(compression());

carritoRouter.get("/", (req, res) => {
  res.send("HOME");
});

carritoRouter.get("/info", (req, res) => {
  const info = { port: port, res: res };
  capaCluster.sendInfo(info);
});

carritoRouter.get("/infoComprimida", compression(), (req, res) => {
  const info = { port: port, res: res };
  capaCluster.info(info);
});

carritoRouter.get("*", (req, res) => {
  const { url, method } = req;
  const info = { url: url, method: method,res:res };
  capaCluster.rutaNoExiste(info);
});

module.exports = carritoRouter;
