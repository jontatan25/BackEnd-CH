const Config = {
    db: {
        name: 'my_database',
        collection: 'productos',
        cnxStr: 'mongodb://localhost:27017/ecommerce',
        //projection: {_id:0, __v:0}
        projection: {__v:0}

    }
}

module.exports = Config