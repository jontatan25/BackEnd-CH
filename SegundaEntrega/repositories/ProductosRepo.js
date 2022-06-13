const ProductoDto = require ("../dtos/ProductoDto.js");
const Producto = require ("../models/ProductModel");
const getDao = require ('../dao/ProductosDaoFactory')

module.exports = class ProductosRepo {

    constructor() {
        this.dao = getDao()
    }

    async getAll() {
        const dtos = await this.dao.getAll({})
        return dtos.map(dto => new Producto(dto))
    }

    async getById(idProd) {
        const dto = await this.dao.getById(idProd)
        return new ProductoDto(dto)
    }

    add(prod) {
        const dto = new ProductoDto(prod)
        return this.dao.save(dto)
    }

    async removeById(idProd) {
        const dto = await this.dao.deleteById(idProd)
        return new ProductoDto(dto)
    }
}