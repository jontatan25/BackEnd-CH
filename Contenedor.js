const fs = require ('fs');
const { stringify } = require('querystring');

let productos = [];
class Contenedor{
    constructor(file){
        this.file = file;
    }
    
    async save(producto){
        try {
            const contenido = await fs.promises.readFile(`./${this.file}`,'utf-8')
        if (contenido === ''){
            producto.id = 1;
            productos.push(producto)
        } else {
            const listaproductos = JSON.parse (contenido);
            producto.id = listaproductos.length + 1;
            listaproductos.push(producto)
            productos = listaproductos;
        }
        
        const productoString = JSON.stringify(productos,null,2)
        await fs.promises.writeFile(`./${this.file}`,productoString)
        console.log ('id = ',producto.id)
        return producto.id;
        
        }    catch(error){
                console.error('Error:', error);
            };
    }
    async getById(numero){
        try{
        const contenido = await fs.promises.readFile(`./${this.file}`,'utf-8')
        const listaproductos = JSON.parse (contenido);
        if (numero)  {  
            return listaproductos[numero-1];
            } else {
                return null;
            }
        } catch(error){
            console.error('Error:', error);
        };
    }
    async getAll(){
        try{
        const contenido = await fs.promises.readFile(`./${this.file}`,'utf-8')
        const listaproductos = JSON.parse (contenido);
        return listaproductos;
        } catch(error){
            console.error('Error:', error);
        };
    }
    async deleteById(numero){
        try{
        const contenido = await fs.promises.readFile(`./${this.file}`,'utf-8')
        const listaproductos = JSON.parse (contenido);
        if (numero)  {  
            listaproductos[numero-1] = '';
            productos = listaproductos;
            const productoString = JSON.stringify(productos,null,2)
            await fs.promises.writeFile(`./${this.file}`,productoString)
            return listaproductos;
            } else {
                return null;
            }
        } catch(error){
            console.error('Error:', error);
        };
        
    }
    async deleteAll(){
        try{
        const contenido = await fs.promises.writeFile(`./${this.file}`,'')
        } catch(error){
            console.error('Error:', error);
        };
    }
    
    

}

module.exports = Contenedor;