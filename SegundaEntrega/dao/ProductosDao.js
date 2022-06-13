class ProductosDao {

    async getAll() {
        throw new CustomError(500, 'falta implementar getAll!')
    }

    async getById(username) {
        throw new CustomError(500, 'falta implementar getById!')
    }

    async add(user) {
        throw new CustomError(500, 'falta implementar add!')
    }

    async deleteById(username) {
        throw new CustomError(500, 'falta implementar deleteById!')
    }

    async deleteAll() {
        throw new CustomError(500, 'falta implementar deleteAll!')
    }

    async updateById(username, nuevoUser) {
        throw new CustomError(500, 'falta implementar updateById!')
    }
}

module.exports =ProductosDao