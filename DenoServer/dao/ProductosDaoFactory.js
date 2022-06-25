const DbClient = require ('./mongo/DbClient.js');
const ProductosDaoMongoDb = require ('./ProductosDaoMongoDb.js');
const  ProductosDaoMemory = require ('./ProductosDao.js')
const { MONGO_URL } = require  ('../config.js')
const minimist = require('minimist')

const persistencia = minimist(procces.argv.slice(2))

let dao

switch (persistencia) {
    case 'mongodb':
        const dbClient = new DbClient(MONGO_URL);
        await dbClient.connect();
        dao = new ProductosDaoMongoDb(dbClient);
        break
    default:
        dao = new ProductosDaoMemory()
}

export function getDao() {
    return dao
}