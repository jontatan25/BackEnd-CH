const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Contenedor = require("../containers/mongoContainer");
const contenedorProducts = new Contenedor("products");
const ContenedorLite = require("../Contenedorsqlite");
const contenedorMessages = new ContenedorLite("./options/sqlite3Config", "messages");

let products = [];
const messages = [];

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
  socket.on("send products", async(product) => {
      const newProduct = {
        socketId: socket.id,
        name: product.name,
        price: product.price,
        url: product.photoUrl,
      };
      contenedorProducts.saveProduct(newProduct);
      let getProducts = contenedorProducts.getAll()
      getProducts.then((products) => console.log(`Los productos son ${products}`))
      socket.emit("send products", products);
   
  });
  socket.emit("chat message", messages);
  // listening and sending mssgs to all users

  socket.on("chat message", (message) => {
    
    const getMessages = contenedorMessages.getAll("messages");
    getMessages.then((res) => {
      for (let i = 0; i < res.length; i++) {
        const newObject = {
          email: res[i].email,
          text: res[i].text,
          time: res[i].time,
        };
        messages.push(newObject);
      }
      const newMessage = {
        email: message.email,
        text: message.text,
        time: message.time,
      };
      contenedorMessages.save(newMessage, "messages");
      console.log(messages);
      io.sockets.emit("chat message", messages);
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on PORT:3000");
});

server.on("error", (error) => console.log(`Server error: ${error}`));
