const logger = require("../logger");
const funcionesServicio = require('../3Servicio/transformacionDatos');

module.exports = {
  sendInfo: async function (info) {
    const datos = await funcionesServicio.obtener(info)
    info.res.send(datos)
  },
  rutaNoExiste: async function (info) {
    const datos = await funcionesServicio.denegar(info)
    info.res.status(404).send(datos)
  },
};
