const express = require('express')
const Contenedor= require('../Contenedor');
const contenedor= new Contenedor('./carritos.JSON');
const {Router} = express

const carritoRouter= Router()

carritoRouter.get('/',async(req,res) => {
    const products = await  contenedor.getAll();
    if (!products) {
        res.send({
            error: 'No hay Carros creados'
        })
    } else
    res.send(products)
})

carritoRouter.get('/:id/productos',async(req,res) => {
    const products = await  contenedor.getAllProducts(req.params.id);
    if (!products) {
        res.send({
            error: 'Producto no encontradoo'
        })
    } else
    res.send(products)
})

carritoRouter.get('/:id',async(req,res) => {
    const productById = await  contenedor.getById(req.params.id);
    if (!productById) {
        res.send({
            error: 'Producto no encontradoo'
        })
    } else
    res.send(productById)
})

carritoRouter.post('/',async(req,res) => {
    const newCart = {}
    const idProducto = await  contenedor.cartSave();
 
    res.send({
        message:'Success',
        ...newCart,
        id: idProducto})
})

carritoRouter.post('/:id/productos',async(req,res) => {
    const nuevoProducto =req.body;
    const cartItem = [{id:req.params.id,producto:nuevoProducto}]
    const idProducto = await  contenedor.saveProduct(...cartItem);
 
    res.send(
        idProducto)
})

carritoRouter.delete('/:id/productos/:id_prod',async(req,res)=>{

    const itemInfo = [{id:req.params.id,idProd:req.params.id_prod}]
    const productDelete = await  contenedor.deleteByIdProd(...itemInfo);

    res.send({
        message: `El producto fue borrado con exito.`,
        data:productDelete
    })

    
})

carritoRouter.delete('/:id',async(req,res)=>{

    const productDelete = await  contenedor.deleteByIdCart(req.params.id);

    if (!productDelete) {
        res.send({
            message: `El Carro # ${req.params.id} No existe.`,   
        })
    } else {
        
        res.send({
            message: `El Carro con el id # ${req.params.id} fue borrado con exito.`,
            data:productDelete
        })
    }
})

module.exports = carritoRouter;