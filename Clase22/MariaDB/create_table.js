const {options} = require("./options/mariadb");
const knex = require("knex")(options);

knex.schema
  .createTable("cars", (table) => {
    // No olvidar primary y not null
    table.increments("id");
    table.string("name");
    table.integer("price");
  })
  .then(() => {
    console.log("table cars created");
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
