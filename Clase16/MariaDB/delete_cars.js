const { options } = require("./options/mariadb");
const knex = require("knex")(options);

knex("cars")
  .del()
  .then(() => {
    console.log("cars deleted");
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
