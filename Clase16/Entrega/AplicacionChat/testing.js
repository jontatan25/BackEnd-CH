
const Contenedor= require('../ContenedorDB');
const contenedor= new Contenedor('./options/knexConfig','cars');

const cars = [
    { name: "Ferrari", price: 200000 },
    { name: "Lamborghini", price: 400000 },
    { name: "Bugatti", price: 600000 },
    { name: "Porsche", price: 800000 },
    { name: "Mercedes", price: 1000000 },
    { name: "Audi", price: 1200000 },
    { name: "BMW", price: 1400000 },
    { name: "Volkswagen", price: 1600000 },
  ]

//  contenedor.getAll('cars');
//  contenedor.save(cars,'cars');
//  contenedor.getById('cars',26);
//  contenedor.deleteById('cars',32);
//  contenedor.deleteAll('cars');
//  contenedor.update('cars',35,'Lada','600000');

//  contenedor.getAll('products');

contenedor.getAll('products')

//  const res = getProducts.map(v => v.RowDataPacket.name);
// console.log(`los productos son ${getProducts}`)

