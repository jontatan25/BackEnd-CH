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
      async function getUsers() {
        return await knex.select("*").from(table);
        
      }
      return (async function () {
        const res = await getUsers();
        
        const productsArray = [];
        for (let i = 0; i < res.length; i++) {
          const newObject = { 
            socketId: res[i].socketId,
            name: res[i].name,
            price: res[i].price,
            url: res[i].url          
          };
          productsArray.push(newObject);
        }
        console.log(productsArray);
      })();
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async save(cars,table) {
    try {
      async function getUsers() {
        return await knex(table)
        .insert(cars)
      }
      
      return (async function () {
        const res = await getUsers();
        console.log("cars inserted",res);
      })();
      
    } catch (error) {
      console.error("Error:", error);
    }
  
  }

  async getById(table,id) {
    try {
      async function getUsers() {
        return await knex.select("*").from(table).where({ id: id });
      }
      return (async function () {
        const res = await getUsers();
        console.log(res);
      })();
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteById(table,id) {
    try {
      async function getUsers() {
        return await knex(table).where({ id: id }).del();
      }
      return (async function () {
        const res = await getUsers();
        console.log(`element #${id} deleted`);
      })();
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteAll(table) {
    try {
      async function getUsers() {
        return await knex(table).del();
      }
      return (async function () {
        const res = await getUsers();
        console.log(`table #${table} has been deleted`);
      })();
      
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async update(table,id,name,price) {
    try {
      async function getUsers() {
        return await knex(table).where({ id: id }).update({name:name},{price:price});
      }
      return (async function () {
        const res = await getUsers();
        console.log(`element #${id} has been updated`);
      })();
      
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

module.exports = Contenedor;
