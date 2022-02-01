const express = require('express');
const app = express();

const productos= []
app.use(express.urlencoded({extended:true}))

app.set('view engine','pug');
app.set('views','./views')

app.get('/',(req,res)=>{
    res.render('home',{
        productos,
    });
});

app.get('/productos',(req,res)=>{
    const tagline= 'Productos';
    res.render('productlist',{
        productos,
        tagline
    });
});

app.post('/productos',(req,res)=>{
    productos.push(req.body)
    console.log(productos);
    res.redirect('/productos')
});

const PORT=8080;
app.listen(PORT,() => console.log(`Escuchando servidor en el puerto ${PORT}`))