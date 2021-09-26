var express = require ('express');

const Contenedor= require('./Contenedor');
const contenedor= new Contenedor('./productos.JSON');

const app = express();
const PORT= 8080

 app.get('/',(solicitud,respuesta,siguiente)=> {

    respuesta.send('Caserolaaa');
 })

 app.listen(PORT, () => {
     console.log(`Servidor En el puerto # ${PORT}`);
 })

 app.get('/productos',async(solicitud,respuesta)=> {
    const productos = await  contenedor.getAll();
    respuesta.json(productos);   
 })

 app.get('/productoRandom',async(solicitud,respuesta)=> {
   let obtenerRandom= (min,max )=> Math.floor(Math.random() *(max - min +1)) + min;
   const productos = await  contenedor.getAll();
   const idRandom = obtenerRandom(1,productos.length)
   const productosrandom = await  contenedor.getById(idRandom);
   respuesta.json(productosrandom);   
})

