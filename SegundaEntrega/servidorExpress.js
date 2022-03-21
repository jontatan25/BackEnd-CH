var express = require ('express');

const productosRouter = require('./router/productos');
const productosRouterf = require('./router/productosf');
const carritoRouter = require('./router/carrito');
const carritoRouterf = require('./router/carritof');

const server = express();
const PORT= 8080

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/',(req,res,siguiente)=> {

    res.send('Home');
 })

server.use('/api/productos',productosRouter)
server.use('/api/productosf',productosRouterf)
server.use('/api/carrito',carritoRouter)
server.use('/api/carritof',carritoRouterf)

server.listen(PORT, () => {
  console.log(`Servidor En el puerto # ${PORT}`);
})


