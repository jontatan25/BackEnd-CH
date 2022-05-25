const res = require('express/lib/response')
const funcionesPersistencia = require('../4Persistencia/datos')

module.exports = {
obtener: async function getDatos() {
    const datos = funcionesPersistencia.obtenerDatosDB()
    return await datos
},
crear:async function crearDato(dato) {
   
    dato.timestamp = Date.now()
    await funcionesPersistencia.guardar(dato)
    return dato
}
}

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