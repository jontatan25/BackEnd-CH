const express = require('express');
const app = express();
const arrProductos= require('../productos')

app.set('view engine', 'ejs');

app.get('/form',(req,res)=>{
    const productos=[
        {name:'Producto1'},
        {name:'Producto2'},
        {name:'Producto3'}
    ];
    const tagline= 'Products';
    res.render('pages/index',{
        productos,
        tagline
    });
});

app.get('/list-productos',(req,res)=>{
    const productos= arrProductos;
    const tagline= 'Productos';
    res.render('pages/productlist',{
        productos,
        tagline
    });
});

app.post('/productos',(req,res)=>{
    const productos= arrProductos;
    const tagline= 'Productos';
    res.render('pages/productlist',{
        productos,
        tagline
    });
});

const PORT=8080;
app.listen(PORT,() => console.log(`Escuchando servidor en el puerto ${PORT}`))