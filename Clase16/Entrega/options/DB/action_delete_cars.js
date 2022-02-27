const {options} = require("../sqlite3Config");
const knex = require("knex")(options);

knex("messages")
  .del()
  .then(() => {
    console.log("messages deleted");
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
