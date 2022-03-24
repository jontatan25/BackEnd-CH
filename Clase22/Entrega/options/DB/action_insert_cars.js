const {options} = require("../sqlite3Config");
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


const messages=[{
  email:"tom",
  text: "hi",
  time: "5"
}]
knex("messages")
  .insert(messages)

  .then(() => {
    console.log("messages inserted");
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
