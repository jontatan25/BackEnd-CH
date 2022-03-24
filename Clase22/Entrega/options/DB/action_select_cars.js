const {options} = require("../sqlite3Config");
const knex = require("knex")(options);

knex.select("*").from('messages')
  .then((rows) => {
    console.log("Messages Selected.");
      for (row of rows) {
          console.log(`id:${row['id']} email:${row['email']} Message:${row['text']} time:${row['time']}`)
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
