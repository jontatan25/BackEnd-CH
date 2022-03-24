const ProductModel = require("../models/ProductModel");
const MsModel = require("../models/MsModel");

const URL = "mongodb://localhost:27017/ecommerce";

const Contenedor = require("../containers/mongoContainer");
const contenedorProducts = new Contenedor("products");

const ContenedorM = require("../containers/mongoContainerM");
const contenedorMs = new ContenedorM("messages");

// const URL = 'mongodb://localhost:27017/ecommerce'

// mongoose.connect(URL)
// .then(async()=>{
//     try {
//         console.log(`Base de datos connectada en ${URL} `)
//         const prod1 = new MessageModel({
//             email: 3,
//             text: 'Product',
//             time: 'time'
//           });
//           let doc = await prod1.save();
//           console.log(doc)

//     } catch (error) {
//         console.log(`Server error: ${error}`)
//     } finally {
//         mongoose.disconnect().catch((error) => console(error))
//     }
// }) .catch(err => console.log(`Server error: ${err}`))

// READALL
// .then(async()=>{
//     try {
//         console.log(`Base de datos connectada en ${URL} `)

//         let doc = await ProductModel.find();
//         console.log(doc)

//     } catch (error) {
//         console.log(`Server error: ${error}`)
//     } finally {
//         mongoose.disconnect().catch((error) => console(error))
//     }
// }) .catch(err => console.log(`Server error: ${err}`))

// READBYID

// .then(async()=>{
//     try {
//         console.log(`Base de datos connectada en ${URL} `)
//         const getProducts = await ProductModel.find()
//         let doc = getProducts.find(product => product.price === 50);
//           console.log(doc)

//     } catch (error) {
//         console.log(`Server error: ${error}`)
//     } finally {
//         mongoose.disconnect().catch((error) => console(error))
//     }
// }) .catch(err => console.log(`Server error: ${err}`))

// UPDATE

// .then(async()=>{
//     try {
//         let resultado = await ProductModel.updateOne({socketId: 3},{$set: {price: 100}});
//         console.log(resultado)

//     } catch (error) {
//         console.log(`Server error: ${error}`)
//     } finally {
//         mongoose.disconnect().catch((error) => console(error))
//     }
// }) .catch(err => console.log(`Server error: ${err}`))

// DELETE

// .then(async()=>{
//     try {
//         let resultado = await ProductModel.deleteOne({socketId: 3});
//         console.log(resultado)

//     } catch (error) {
//         console.log(`Server error: ${error}`)
//     } finally {
//         mongoose.disconnect().catch((error) => console(error))
//     }
// }) .catch(err => console.log(`Server error: ${err}`))

// const newProduct = {
//     socketId: 123,
//     name: 'product.name',
//     price: 124,
//     url: 'product.photoUrl',
//   };
//   contenedorProducts.saveProduct(newProduct);

// contenedorProducts.getAll()

// const prod1 = new MsModel({

//   email: "Message7",
//   text: "125",
//   time: "product.photoUrl",
// });

// // contenedorMs.saveMessage(prod1);

// contenedorMs.getAllMessages()

// CREATING CONTAINER for MESSAGES

// const mongoose = require("mongoose");
// const MessageModel = require("../models/MsModel");

// let createContainer = async() => {
//   try {
//     await mongoose.connect(URL);
//     console.log(`Base de datos connectada en ${URL} `);
//     const prod1 = new MessageModel({
//       id:"msg",
//       messages: []
//     });
//     await prod1.save();
//     console.log("Container Guardado");
//   } catch (error) {
//     console.log(`Server error: ${error}`);
//   } finally {
//     await mongoose.disconnect().catch((error) => console(error));
//   }
// }

// createContainer()

// NORMALIZING MESSAGES

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

let originalData = [
  {
    id: "1",
    messages: [
      {
        id: "123",
        author: {
          id: "email5",
          nombre: "nombre",
          apellido: "apellido del usuario",
          edad: "5",
          alias: "alias",
          avatar: "avatar",
        },
        text: "mensaje de usuario5",
      },
      {
        id: "1123",
        author: {
          id: "email6",
          nombre: "nombre",
          apellido: "apellido del usuario",
          edad: "5",
          alias: "alias",
          avatar: "avatar",
        },
        text: "mensaje de usuario6",
      },
      {
        id: "1223",
        author: {
          id: "email7",
          nombre: "nombre",
          apellido: "apellido del usuario",
          edad: "5",
          alias: "alias",
          avatar: "avatar",
        },
        text: "mensaje de usuario7",
      },
      {
        id: "1233",
        author: {
          id: "email5",
          nombre: "nombre",
          apellido: "apellido del usuario",
          edad: "5",
          alias: "alias",
          avatar: "avatar",
        },
        text: "mensaje de usuario5- 2",
      },
    ],
  },
];

const authorSchema = new schema.Entity("author", { idAttribute: "id" });
const textoSchema = new schema.Entity("text")

const mensajeSchema = new schema.Entity(
	"post",
	{
		author: authorSchema,
	},
	{ idAttribute: (value) => 123 }
);

const util = require("util");
function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

console.log("------------ORIGINAL------------");

console.log(JSON.stringify(originalData).length);
console.log("------------NORMALIZED------------");

const normalizedData = normalize(originalData, mensajeSchema);
print(normalizedData);
console.log(JSON.stringify(normalizedData).length);

console.log("------------DENORMALIZED------------");

// const denormalizedData = denormalize(normalizedData.author,);
