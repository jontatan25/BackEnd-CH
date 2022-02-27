const Contenedor = require("../ContenedorDB");
const contenedor = new Contenedor("./options/knexConfig", "cars");

const cars = [
  { name: "Ferrari", price: 200000 },
  { name: "Lamborghini", price: 400000 },
  { name: "Bugatti", price: 600000 },
  { name: "Porsche", price: 800000 },
  { name: "Mercedes", price: 1000000 },
  { name: "Audi", price: 1200000 },
  { name: "BMW", price: 1400000 },
  { name: "Volkswagen", price: 1600000 },
];

const productsArray = [];

//  contenedor.getAll('cars');
//  contenedor.save(cars,'cars');
//  contenedor.getById('cars',26);
//  contenedor.deleteById('cars',32);
//  contenedor.deleteAll('products');
//  contenedor.update('cars',35,'Lada','600000');

//  contenedor.getAll('products');

// const getProducts = contenedor.getAll("products");
// getProducts.then((res) => {
//   for (let i = 0; i < res.length; i++) {
//     const newObject = {
//       socketId: res[i].socketId,
//       name: res[i].name,
//       price: res[i].price,
//       url: res[i].url,
//     };
//     productsArray.push(newObject);
//   }
// });

// creating the sqlite3db, 
// but it will be automatycally created whit the name given in the config file when creating a table

const sqlite3 = require("sqlite3");

let db = new sqlite3.Database("../DB/ecommerce.sqlite", (err) => {
  if (err) {
    console.log("Error when creating the database", err);
  } else {
    console.log("Database created!");
    /* Put code to create table(s) here */
    // createTable()
  }
});
