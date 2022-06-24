
const Productos = require('../dao/ProductosDaoDb')


class Producto {
    constructor(id, { name, descripcion, timestamp, codigo ,photoUrl, price, stock}) {
        this.id = id;
        this.name = name;
        this.descripcion = descripcion;
        this.timestamp = timestamp;
        this.codigo = codigo;
        this.photoUrl = photoUrl,
        this.price = price;
        this.stock = stock
    }
}


async function getProductos() {
    return await Productos.getAll();
}

async function addProducto({ producto }) {
    const id = crypto.randomBytes(10).toString('hex');
    const nuevoProducto = new Producto(id, datos)
    Productos.add(producto);
    return nuevoProducto;
}
async function deleteProducto({ id }) {
    const id = crypto.randomBytes(10).toString('hex');
    const nuevoProducto = new Producto(id, datos)
    Productos.delete(nuevoProducto);
    return nuevoProducto;
}
async function updateProducto({ producto, idProd }) {
    const nuevoProducto = new Producto(idProd, datos)
    Productos.update(producto, idProd);
    return nuevoProducto;
}

module.exports = {Producto,getProductos,updateProducto, addProducto, deleteProducto};