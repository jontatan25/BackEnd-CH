const {options} = require("./options/mariadb");
const knex = require("knex")(options);

knex.select("*").from('cars')
  .then((rows) => {
    console.log("Cars Selected.");
      for (row of rows) {
          console.log(`${row['id']}${row['name']}${row['price']}`)
      }
    
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
