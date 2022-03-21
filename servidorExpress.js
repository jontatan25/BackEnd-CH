var express = require ('express');

const Contenedor= require('./Contenedor');
const productosRouter = require('./router/productos');
const carritoRouter = require('./router/carrito');
const productosRouterf = require('./router/productosf');

const server = express();
const PORT= 8080

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/',(solicitud,respuesta,siguiente)=> {

    respuesta.send('Home');
 })

server.use('/api/productos',productosRouter)
server.use('/api/carrito',carritoRouter)
server.use('/api/productosf',productosRouterf)


server.listen(PORT, () => {
  console.log(`Servidor En el puerto # ${PORT}`);
})


