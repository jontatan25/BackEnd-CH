const ProductModel = require ('../models/ProductModel');

const Contenedor = require("../containers/mongoContainer");
const contenedorProducts = new Contenedor("products");

// const URL = 'mongodb://localhost:27017/ecommerce'

// mongoose.connect(URL)
// .then(async()=>{
//     try {
//         console.log(`Base de datos connectada en ${URL} `)
//         const prod1 = new ProductModel({
//             socketId: 3,
//             name: 'Product2',
//             url: 'this is URL' ,
//             price: 60,
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
  

contenedorProducts.getAll()

