const express = require('express')
const Contenedor= require('../Contenedor');
const contenedor= new Contenedor('./productos.JSON');
const {Router} = express
const productosRouter= Router()

productosRouter.get('/',async(req,res) => {
    const productos = await  contenedor.getAll();
    res.send({
        message: 'Success',
    data: productos})
})

productosRouter.get('/:id',async(req,res) => {
    const productById = await  contenedor.getById(req.params.id);
    if (!productById) {
        res.send({
            error: 'Producto no encontradoo'
        })
    } else
    res.send(productById)
})

productosRouter.post('/',async(req,res) => {
    const idProducto = await  contenedor.cartSave();
 
    res.send({
        message:'Success',
        ...nuevoProducto,
        id: idProducto})
})

productosRouter.put('/:id',async(req,res)=>{

    const productoID = req.body;
    const productUpdate = await  contenedor.update(req.params.id,productoID);

    if (!productUpdate) {
        res.send({
            message: 'Operation Incomplete',
            data:productUpdate
        })
    } else
    res.send({
        message: 'Operation Complete',
        data:productUpdate
    })
})

productosRouter.delete('/:id',async(req,res)=>{

    const productDelete = await  contenedor.deleteById(req.params.id);

    res.send({
        message: `El producto # ${req.params.id} fue borrado con exito.`,
    })
})

module.exports = productosRouter;