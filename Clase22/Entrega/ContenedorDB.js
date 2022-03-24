const { options } = require("./options/knexConfig");
const knex = require("knex")(options);

//   Getting the time for Timestamp
var today = new Date();
var date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date + " " + time;

class Contenedor {
  constructor(options, tableName) {
    this.options = options;
    this.tableName = tableName;
  }

  async getAll(table) {
    try {
      let itemList = await knex.select("*").from(table)
        return itemList
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async save(cars,table) {
    try {
      let itemList=
        await knex(table).insert(cars);
        console.log(`Se han agregado los items a la tabla ${table}`)
          return await itemList
   
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async getById(table, id) {
    try {
      let itemList= await knex.select("*").from(table).where({ id: id });
      console.log(`Se han seleccionado los elementos de la tabla ${table}`)
      return itemList;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteById(table, id) {
    try {
      let itemList= await knex(table).where({ id: id }).del();
      console.log(`Se ha borrado el elemento con el id ${id} de la tabla ${table}`)
      return itemList;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteAll(table) {
    try {
      let itemList= await knex(table).del();
      console.log(`Se ha borrado todos los elementos de la tabla de la tabla ${table}`)
      return itemList;
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async update(table, id, name, price) {
    try {
      let itemList= await knex(table)
          .where({ id: id })
          .update({ name: name }, { price: price });
          console.log(`element #${id} has been updated`);
      
      return itemList;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
}

module.exports = Contenedor;
