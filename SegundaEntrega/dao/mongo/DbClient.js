const { MongoClient } = require ("mongodb");
module.exports = class DbClient {

    constructor(url) {
        this.cliente = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }

    connect() {
        return this.cliente.connect();
    }

    disconnect() {
        return this.cliente.close();
    }

    getCollection(database, collection) {
        return this.cliente.db(database).collection(collection);
    }
}