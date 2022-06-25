const { Schema, model } = require("mongoose");

const userSchema = new Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  direccion: { type: String, required: true },
  edad: { type: String, required: true },
  telefono: { type: String, required: true },
  avatar: { type: String, required: true },
  cart: []
});
const UserModel = model('users', userSchema);

module.exports = UserModel; //(exportando el modulo)
