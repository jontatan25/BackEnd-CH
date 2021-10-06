var express = require ('express');

const Contenedor= require('./Contenedor');
const productosRouter = require('./router/productos');
const contenedor= new Contenedor('./productos.JSON');

const server = express();
const PORT= 8080

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/',(solicitud,respuesta,siguiente)=> {

    respuesta.send('Home');
 })

server.use('/api/productos',productosRouter)

server.listen(PORT, () => {
  console.log(`Servidor En el puerto # ${PORT}`);
})


