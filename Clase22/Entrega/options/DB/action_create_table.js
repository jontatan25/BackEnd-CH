const {options} = require("../sqlite3Config");
const knex = require("knex")(options);

knex.schema
  .createTable("messages", (table) => {
    // No olvidar primary y not null
    table.increments("id");
    table.string("email");
    table.string("text");
    table.string("time");
  })
  .then(() => {
    console.log("table chats created");
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
