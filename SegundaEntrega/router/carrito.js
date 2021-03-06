const express = require('express')
const Contenedor= require('../containers/memoria');
const contenedor= new Contenedor('./carritos.JSON');
const {Router} = express

const carritoRouter= Router()

const Contenedorm = require("../containers/mongoContainerCart");
const contenedorCart = new Contenedorm("Cart");


const checkAdmin = true;

carritoRouter.get('/',async(req,res) => {
    const products = await  contenedorCart.getAll();
    if (!products) {
        res.send({
            error: 'No hay Carros creados'
        })
    } else
    res.send(products)
})

carritoRouter.post('/',async(req,res) => {
  const newCart = {}
  const idProducto = await  contenedorCart.saveCart();

  res.send({
      message:'Success',
      ...newCart,
      id: idProducto})
})

carritoRouter.delete('/:id',async(req,res)=>{

  if (checkAdmin) {
      const productById = await contenedorCart.getById(req.params.id);
      if (!productById) {
        res.send({
          error: `"El carro con el id # ${req.params.id} no existe"`,
        });
      } else {
        await contenedorCart.deleteById(req.params.id)
        res.send({
          message: `"El producto con el id # ${req.params.id}" ha sido borrado`,
        });
        ;
      }
    } else {
      res.send({ error: -1, message: "Acceso Denegado" });
    }
})

carritoRouter.post('/:id/productos',async(req,res) => {
  const nuevoProducto =req.body;
  const cartItem = [{id:req.params.id,producto:nuevoProducto}]
  await contenedorCart.saveProduct(...cartItem);

  res.send(
      {mensaje: "Done"})
})

carritoRouter.get('/:id/productos',async(req,res) => {
    const products = await  contenedorCart.getAllProducts(req.params.id);
    if (!products) {
        res.send({
            error: 'Producto no encontradoo'
        })
    } else
    res.send(products)
})

carritoRouter.get('/:id',async(req,res) => {
    const productById = await  contenedorCart.getById(req.params.id);
    if (!productById) {
        res.send({
            error: 'Producto no encontradoo'
        })
    } else
    res.send(productById)
})

carritoRouter.delete('/:id/productos/:id_prod',async(req,res)=>{

    const deleteInfo = [{id:req.params.id,idProd:req.params.id_prod}]
    const cartById = await  contenedorCart.getById(req.params.id)

    if (checkAdmin) {
        
        if (!cartById) {
          res.send({
            error: `"El carro con el id # ${req.params.id} no existe"`,
          });
        } else {
          await contenedorCart.deleteProductById(deleteInfo)
          res.send({
            message: `"El producto con el id # ${req.params.id}" en el carro con el id #${req.params.id_prod} ha sido borrado`,
          });
          ;
        }
      } else {
        res.send({ error: -1, message: "Acceso Denegado" });
      }
  

    
})



module.exports = carritoRouter;