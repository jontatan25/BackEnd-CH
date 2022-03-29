const mongoose = require("mongoose");
// MODELS

const UserModel = require("../models/userModel");

const AtlasUrl =
  "mongodb+srv://zamiipx:Fishman2@cluster0.rjl6p.mongodb.net/logindb?retryWrites=true&w=majority";

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  // USERS

  async saveUser(user) {
    try {
      await mongoose.connect(AtlasUrl);
      const userString = user.toString()
      const prod1 = new UserModel({
        userName: userString
      });
      await prod1.save();
    } catch (error) {
      console.log(`Server error: ${error}`);
    } finally {
      await mongoose.disconnect().catch((error) => console(error));
    }
  }
}

module.exports = Contenedor;
