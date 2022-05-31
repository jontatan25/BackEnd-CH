const ProductosDao = require('./mongoDAO')

class ProductosApi {
  constructor(file) {
    this.file = file;
    this.productosDao = new ProductosDao();
  }

  //USERS
  async saveUser(user) {
    const user = await this.productosDao.saveUser(user);
    return user
  }

  async getAllUsers() {
    const users = await this.productosDao.getAllUsers();
    return users
  }

  async getUser(username) {
    const getUsername = await this.productosDao.getUser(username);
    return getUsername
  }

  
  // PRODUCTS
  async saveProduct(info) {
    const savedProduct = await this.productosDao.saveProduct(info);
    return savedProduct
  }
  async getAll() {
    const products = await this.productosDao.getAll();
    return products
  }
  async getById(id) {
    const foundProduct = await this.productosDao.getById(id)
    return foundProduct
  }
  async update(newProduct) {
    const updatedProduct = await this.productosDao.update(newProduct);
    return updatedProduct
  }
  async deleteById(id) {
    const savedProduct = await this.productosDao.deleteById(id);
    return console.log('El producto ha sido Borrado')
  }

  // MESSAGES

  async saveMessage(message) {
    const savedMessage = await this.productosDao.saveMessage(message);
    return savedMessage
  }

  async getAllMessages() {
    const allMessages = await this.productosDao.getAllMessages()
    return allMessages
  }
}

module.exports = ProductosApi;
