import ProductosDao from './ProductosDao.js'
const UserModel = require("../models/Users");
import CustomError from '../errores/CustomError.js'
import MyMongoClient from '../db/DbClientMongo.js'
import Config from '../config.js'

class ProductosDaoDb extends ProductosDao {

    constructor() {
        super()
        this.client = new MyMongoClient()
        this.client.connect()
        this.projection = Config.db.projection
    }

    async getAll() {
        try {
          let getUsers = await UserModel.find({});
    
          getUsers.map((user) => userContainer.push(user));
          console.log("Users had been adquired");
          return userContainer;
        } catch (error) {
            throw new CustomError(500, 'error al obtener todos los productos', err)
        } finally {
          await mongoose.disconnect().catch((error) => console(error));
        }
      }

      async getById(username) {
        try {
          const getUser = await UserModel.find({ username: username });
          return getUser;
        } catch (error) {
            throw new CustomError(500, 'error al obtener todos los productos', err)
        } finally {
          mongoose.disconnect().catch((error) => console(error));
        }
      }

      async add(user) {
        try {
          const prod1 = new UserModel({
            email: user.email,
            password: user.password,
            username: user.username,
            direccion: user.direccion,
            edad: user.edad,
            telefono: user.telefono,
            avatar: user.avatar,
          });
          await prod1.save();
          console.log("Documento Guardado");
        } catch (error) {
            throw new CustomError(500, 'error al obtener todos los productos', err)
        } finally {
          await mongoose.disconnect().catch((error) => console(error));
        }
      }

      async deleteById(username) {
        let result
        try {
            result = await productos.deleteOne({ _id: username })
        } catch (error) {
            throw new CustomError(500, `error al borrar producto`, error)
        }

        if (result.deletedCount == 0) {
            throw new CustomError(404, `no existe un producto para borrar con id: ${username}`, { username })
        }
    }

    async deleteAll() {
        try {
            await productos.deleteMany()
        } catch (error) {
            throw new CustomError(500, `error al borrar a todos los productos`, error)
        }
    }

    async updateById(username, nuevoUser) {
        let result
        try {
            result = await productos.findOneAndReplace({ _id: idParaReemplazar }, nuevoProd, this.projection)
        } catch (error) {
            throw new CustomError(500, `error al reemplazar al producto`, error)
        }

        if (!result) {
            throw new CustomError(404, `no se encontró para actualizar un producto con id: ${idParaReemplazar}`, { idParaReemplazar })
        }

        return nuevoProd
    }

    exit() {
        this.client.disconnect()
    }
}

export default ProductosDaoDb