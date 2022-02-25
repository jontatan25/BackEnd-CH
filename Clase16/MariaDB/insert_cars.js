const { options } = require("./options/mariadb");
const knex = require("knex")(options);

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

knex("cars")
  .insert(cars)

  .then(() => {
    console.log("cars inserted");
  })
  .catch((err) => {
    console.log(err);
    //   capturando el error
    throw err;
  })
  .finally(() => {
    //   liberar recursos, destruye la conexion
    knex.destroy();
  });
