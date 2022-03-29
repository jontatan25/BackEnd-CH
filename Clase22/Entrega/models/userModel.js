const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: { type: String, required: true },
});
const UserModel = model('username', userSchema);

module.exports = UserModel; //(exportando el modulo)
