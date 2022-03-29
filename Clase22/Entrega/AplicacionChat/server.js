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
const ContenedorU = require("../containers/users");
const contenedorUsers = new ContenedorU("users");
// COOKIES
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// NEED FOR POSTING
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://zamiipx:Fishman2@cluster0.rjl6p.mongodb.net/logindb?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    /* ----------------------------------------------------- */

    secret: "secretWord",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30000,
    },
  })
);

let products = [];
let messagesArr = [];

let loggedIn = false;
let loggedUserInfo = null;
let actualSession = null;

// app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/api/productos-test", (req, res) => {
  res.render("pages/products");
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    loggedIn = true;
    loggedUserInfo = req.session.user;
    console.log("Creando session last");

  } else {
    loggedIn = true;
    req.session.user = null;
    loggedUserInfo = null;
    console.log("Nueva sesion creada");
    console.log(req.session);
  }
  res.render("pages/login");
});
app.get("/loggedIn", (req, res) => {
  res.render("pages/logged");
});
app.post("/loggedIn", (req, res) => {
  req.session.user = req.body.username;
  res.render("pages/logged");
});

app.get("/counter", (req, res) => {
  if (req.session.number) {
    req.session.number++;
    res.send(`Ud ha visitado el sitio ${req.session.number} veces.`);
  } else {
    req.session.number = 1;
    res.send("Bienvenido!");
  }
});
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("pages/logout");
      loggedUserInfo = null;
    } else res.send({ status: "Logout ERROR", body: err });
  });
});
app.get("/info", (req, res) => {
  console.log("------------ req.session -------------");
  console.log(req.session);
  console.log("--------------------------------------");

  console.log("----------- req.sessionID ------------");
  console.log(req.sessionID);
  console.log("--------------------------------------");

  console.log("----------- req.cookies ------------");
  console.log(req.cookies);
  console.log("--------------------------------------");

  console.log("---------- req.sessionStore ----------");
  console.log(req.sessionStore);
  console.log("--------------------------------------");

  res.send("Send info ok!");
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

  let checklogin = () => {
    if (loggedIn == true && loggedUserInfo !== null) {
      let userInfo = loggedUserInfo;
      socket.emit("login", userInfo);
      console.log("Logeado");
    } else if (loggedIn == false && loggedUserInfo !== null) {
      let userInfo = null;
      loggedUserInfo = null;
      socket.emit("login", userInfo);
      console.log("Sesion Expirada");
    } else {
      console.log(loggedIn + "loggedInfo" + loggedUserInfo);
      let userInfo = null;
      socket.emit("login", userInfo);
      console.log("No logeado");
    }
  };
  checklogin();

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
      socket.emit("chat message", normalizedInfo);
    };
    getMessages();
  });

  socket.on("login", (userInfo) => {
    let saveUserName = async () => {
      if (loggedIn == true) {
        console.log("logintrue");
        await contenedorUsers.saveUser(userInfo);
        loggedUserName = userInfo;
        console.log("loginuserInfo=" + userInfo);
        console.log("loginloggedUserName =" + loggedUserName);
        socket.emit("login", userInfo);
      } else {
        userInfo = null;
        loggedUserInfo = null;
        console.log("loginfalse");
        socket.emit("login", userInfo);
      }
    };
    saveUserName();
  });
  socket.on("logout", () => {
    console.log("se ha cerrado sesion");
  });
});

server.listen(3000, () => {
  console.log("listening on PORT:3000");
});

server.on("error", (error) => console.log(`Server error: ${error}`));
