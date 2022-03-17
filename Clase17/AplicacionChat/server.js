const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Contenedor = require("../containers/mongoContainer");
const contenedorProducts = new Contenedor("products");
const ContenedorM = require("../containers/mongoContainerM");
const contenedorMessages = new ContenedorM("messages");

let products = [];
let messagesArr = [];

// app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // send chat to the user that just connected
  socket.emit("send products", products);
  // // listening and sending msgs to all users
  socket.on("send products",(product) => {
      const newProduct = {
        socketId: socket.id,
        name: product.name,
        price: product.price,
        url: product.photoUrl,
      };
      
      let getProducts = async () => {
        await contenedorProducts.saveProduct(newProduct);
        let doc = await contenedorProducts.getAll()
        if (products.length == 0) {
          products = [...doc]
          console.log("Products Gathered")
        } else {
          products.push(newProduct);
          console.log("New product added")
        }
      }
      getProducts()
      socket.emit("send products", products);
   
  });
  socket.emit("chat message", messagesArr);
  // listening and sending mssgs to all users

  socket.on("chat message", (userInfo) => {
    const newmessage = {
      email: userInfo.email,
      text: userInfo.text,
      time: userInfo.time,
    };
    let getMessages = async () => {
      await contenedorMessages.saveMessage(newmessage);
      let doc = await contenedorMessages.getAllMessages();
      if (messagesArr.length == 0) {
        messagesArr = [...doc]
        console.log("Messages Gathered")
        console.log(userInfo)
      } else {
        messagesArr.push(newmessage);
        console.log("New Message added")
      }
    }
    getMessages()
    io.sockets.emit("chat message", messagesArr);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on PORT:3000");
});

server.on("error", (error) => console.log(`Server error: ${error}`));
