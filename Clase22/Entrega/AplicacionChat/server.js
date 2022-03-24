const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { faker } = require("@faker-js/faker");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Contenedor = require("../containers/mongoContainer");
const contenedorProducts = new Contenedor("products");
const ContenedorM = require("../containers/mongoContainerM");
const contenedorMessages = new ContenedorM("messages");

const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

// NEED FOR POSTING
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let products = [];
let messagesArr = [];

// app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/api/productos-test", (req, res) => {
  res.render("pages/products");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  // socket.emit("send products", products);
  // //gathering chat messages
  // let getProducts = async () => {
  //   let productsArr = await contenedorProducts.getAll();
  //   socket.emit("chat message", productsArr);
  // };

  // getProducts();

  // // listening and sending msgs to all users
  let getMessages = async () => {
    let normalizedInfo = await contenedorMessages.getAllMessages();
    if (normalizedInfo) {
      socket.emit("chat message", normalizedInfo);
    }
  };
  getMessages();
  
  socket.on("send products", (product) => {
    const newProduct = {
      socketId: socket.id,
      name: product.name,
      price: product.price,
      url: product.photoUrl,
    };

    let getProducts = async () => {
      await contenedorProducts.saveProduct(newProduct);
      let doc = await contenedorProducts.getAll();
      if (products.length == 0) {
        products = [...doc];
        console.log("Products Gathered");
      } else {
        products.push(newProduct);
        console.log("New product added");
      }
    };
    getProducts();
    socket.emit("send products", products);
  });

  socket.on("get products", () => {
    const productsArr = [];
    for (let i = 0; i < 5; i++) {
      productsArr.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        url: faker.image.image(),
      });
    }
    socket.emit("get products", productsArr);
  });
  
  socket.on("chat message", (userInfo) => {
    let getMessages = async () => {
      let normalizedInfo = await contenedorMessages.saveMessage(userInfo);
      socket.emit("chat message", normalizedInfo)
    };
    getMessages();
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});



server.listen(3000, () => {
  console.log("listening on PORT:3000");
});

server.on("error", (error) => console.log(`Server error: ${error}`));
