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

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

const FACEBOOK_APP_ID = "344871087598654";
const FACEBOOK_APP_SECRET = "0f7f6f1c361245b86057215c1891724a";
// const jwt = require ("jsonwebtoken")
// const tokenSecret = "claveSecreta"

//SESSION
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      maxAge: 20000, //20 seg
    },
  })
);

// NEED FOR POSTING / MIDDLEWARES
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());



//PASSPORT
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
      //opcional para acceder a mas datos:
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('accessToken: ', accessToken)
      console.log('refreshToken: ', refreshToken)
      console.log(profile);
      cb(null, profile);
    }  
  )
);

// function generateToken(user) {
//   return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
// }

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

let products = [];

let loggedIn = false;
let loggedUserInfo = null;

//TEMPLATE ENGINE
// app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");

// ROUTES
app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/api/productos-test", (req, res) => {
  res.render("pages/products");
});

app.get("/auth/facebook", passport.authenticate("facebook",{ scope : ['email'] }));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    successRedirect: "/datos",
    authType: "reauthenticate",
  })
);

app.get("/login", (req, res) => {
  if (req.session.user) {
    loggedIn = true;
    loggedUserInfo = req.session.user;
 
  } else {
    loggedIn = true;
    req.session.user = null;
    loggedUserInfo = null;
    
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


app.get('/datos', (req, res)=>{
  if(req.isAuthenticated()){
   if (!req.user.contador) {
       req.user.contador = 0
       
   }
   req.user.contador++
   const datosUsuario = {
       nombre: req.user.displayName,
       foto: req.user.photos[0].value,
       email: req.user.emails[0].value,
   }
   res.render('pages/datos', {contador: req.user.contador, datos: datosUsuario});
  } else {
   res.redirect('/login')
   console.log('Usuario no autenticado')
  }
});

app.get('/logout', (req, res)=>{
   req.logout();
   res.render('pages/logout')
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
      
    } else if (loggedIn == false && loggedUserInfo !== null) {
      let userInfo = null;
      loggedUserInfo = null;
      socket.emit("login", userInfo);
      c
    } else {
     
      let userInfo = null;
      socket.emit("login", userInfo);
     
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
        
      } else {
        products.push(newProduct);
     
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
        
        await contenedorUsers.saveUser(userInfo);
        loggedUserName = userInfo;
       
        socket.emit("login", userInfo);
      } else {
        userInfo = null;
        loggedUserInfo = null;
       
        socket.emit("login", userInfo);
      }
    };
    saveUserName();
  });
  socket.on("logout", () => {
    console.log("se ha cerrado sesion");
  });
});

server.listen(8000, () => {
  console.log("listening on PORT:8000");
});

server.on("error", (error) => console.log(`Server error: ${error}`));
