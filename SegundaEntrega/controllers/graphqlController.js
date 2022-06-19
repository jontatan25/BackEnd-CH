

const Productos = require('../dao/ProductosDaoDb')

const schema = buildSchema(`
  input ProductoInput {
    name: String,
    descripcion: String,
    timestamp: Float,
    codigo: Float,
    photoUrl: String,
    price : Float,
    stock : Float
  }
  type Producto {
    id: ID!
    name: String,
    descripcion: String,
    timestamp: Float,
    codigo : Float,
    photoUrl: String,
    price: Float,
    stock : Float
  }
  type Query {
    getProductos: [Producto],
  }
  type Mutation {
    addProducto(datos: ProductoInput): Producto,
    updateProducto(id: ID!, datos: ProductoInput): Producto,
    deleteProducto(id: ID!): Producto,
  }
`);


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
async function updateProducto({ producto, id }) {
    const nuevoProducto = new Producto(id, datos)
    Productos.update(producto, id);
    return nuevoProducto;
}

module.exports = {Producto,schema,getProductos,updateProducto, addProducto, deleteProducto};