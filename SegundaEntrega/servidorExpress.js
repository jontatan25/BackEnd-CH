var express = require ('express');

const productosRouter = require('./router/productos');
const carritoRouter = require('./router/carrito');

const server = express();
const PORT= 8080

server.use(express.json())
server.use(express.urlencoded({extended: true}))

server.get('/',(req,res,siguiente)=> {

    res.send('Home');
 })

server.use('/api/productos',productosRouter)
server.use('/api/carrito',carritoRouter)

server.listen(PORT, () => {
  console.log(`Servidor En el puerto # ${PORT}`);
})


