const DbClient = require ('./mongo/DbClient.js');
const ProductosDaoMongoDb = require ('./ProductosDaoDb');
const  ProductosDaoMemory = require ('./ProductosDao.js')
const { MONGO_URL } = require  ('../config.js')
const minimist = require('minimist')

const persistencia = minimist(process.argv.slice(2))

async function dao (persistencia){

switch (persistencia) {
    case 'mongodb':
        const dbClient = new DbClient(MONGO_URL);
        await dbClient.connect();
        dao = new ProductosDaoMongoDb(dbClient);
        break
    default:
        dao = new ProductosDaoMemory()
}
}
module.exports = function getDao() {
    return dao
}