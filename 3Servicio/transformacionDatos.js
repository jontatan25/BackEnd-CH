const funcionesPersistencia = require("../4Persistencia/datos");
const logger = require("../logger");

module.exports = {
  obtener: async function getDatos(info) {
    const datos = await funcionesPersistencia.obtenerDatosDB(info);

    const servicio = `servidor Express <span style="color:blueviolet;">(NginX)</span> en  ${datos.port} - <b>process id: ${datos.process}</b> -${new Date().toLocaleString()}`;
    logger.info(`port: ${datos.port} -> FyH: ${Date.now()}`);
    return servicio;
  },
  denegar: async function denegarConMensaje(info) {
    const dato = await funcionesPersistencia.accesoDenegado(info);
    logger.info(`Ruta ${dato.method} ${dato.url} no implementada`);
    logger.warn(`Ruta ${dato.method} ${dato.url} no implementada`);
    const completarMensaje = `Ruta ${dato.method} ${dato.url} no implementada`
    return completarMensaje;
  },
};

// module.exports = {
// getController: async function getDatosController() {
//     const datos = funcionesPersistencia.obtener()
//     res.json(datos)
// },
// postController:async function postDatosController(req,res) {
//     const dato = req.body
//     await funcionesPersistencia.guardar(dato)
//     res.status(201).json(dato)
// }
// }
