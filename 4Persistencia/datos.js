const datos = [];

module.exports = {
  obtenerDatosDB: async function obtenerDatos(info) {
    
    const datos = {port:info.port,
    process:process.pid}
    return datos;
  },

  accesoDenegado: async function guardarDato(info) {
    const mensajeNoAutorizado= {method:info.method, url : info.url};
    return mensajeNoAutorizado;
  },
};
