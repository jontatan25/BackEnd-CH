var express = require("express");

const productosRouter = require("./router/productos");
const carritoRouter = require("./router/carrito");

const Contenedormongo = require("./containers/mongoContainer");
const contenedorUsers = new Contenedormongo("users");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const server = express();
const PORT = 8080;

//nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zamiipx@gmail.com",
    pass: "Fishman1$1991", // generated ethereal password
  },
});

function newAccNodeMailer(newUser) {
  let newAccountCreated = {
    from: "zamiipx@gmail.com",
    to: "jhonn.photo@gmail.com",
    subject: "Nuevo Registro de Usuario",
    text: JSON.stringify(newUser, null, "\t"),
  };
  transporter.sendMail(newAccountCreated, (err) => {
    if (err) {
      console.log(error);
    } else {
      console.log("Email has been sent");
      console.log(newUser);
    }
  });
}

function newOrderNodeMailer(info) {
  let newOrder = {
    from: "zamiipx@gmail.com",
    to: "jhonn.photo@gmail.com",
    subject: `Nuevo pedido de ${info.user}`,
    text: JSON.stringify(info, null, "\t"),
  };
  transporter.sendMail(newOrder, (err) => {
    if (err) {
      console.log(error);
    } else {
      console.log("Se ha enviado la Orden al correo");
      console.log(newOrder);
    }
  });
}

//MIDDLEWARES

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 },
  })
);

//Funciones para validar PASSPORT
function isValidPassword(user, password) {
  return Bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return Bcrypt.hashSync(password, Bcrypt.genSaltSync(10), null);
}

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log("Usuario no Logeado,redirect a Login");
    res.send("redirect a Login");
  }
}
function postSignup(req, res) {
  var user = req.user;
  res.send("Usuario Loggeado");
}
function failSignup(req, res) {
  res.send("Error en Signup");
}
function postLogin(req, res) {
  var user = req.user;
  res.send("Usuario Loggeado");
}
function failLogin(req, res) {
  res.send("Error en login");
}

//PASSPORT SIGNUP
passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      const findUser = async () => {
        try {
          const user = await contenedorUsers.getUser(username);
          if (user.length > 0) {
            console.log("user is already in use");
            return done(null, false);
          } else {
            const newUser = {
              username: username,
              password: createHash(password),
              email: req.body.email,
              direccion: req.body.direccion,
              edad: req.body.edad,
              telefono: req.body.telefono,
              avatar: req.body.avatar,
              cart: [],
            };
            const saveUser = async () => {
              try {
                await contenedorUsers.saveUser(newUser);
                console.log("Nuevo Usuario creado");
                newAccNodeMailer(newUser);
              } catch (error) {
                console.log(error);
              }
            };
            saveUser();
            return done(null, true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      findUser();
    }
  )
);

//PASSPORT LOGIN
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    const findUser = async () => {
      try {
        const user = await contenedorUsers.getUser(username);
        if (user.length == 0) {
          console.log("user not found");
          return done(null, false);
        } else if (!isValidPassword(user[0], password)) {
          console.log("Invalid password");
          return done(null, false);
        } else {
          console.log("Information Matched");
          return done(null, user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    findUser();
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

//MIDDLEWARES\
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use(passport.session());

//RUTAS

server.use("/api/productos", productosRouter);
// server.use("/api/productosf", productosRouterf);
// server.use("/api/carrito", carritoRouter);
// server.use("/api/carritof", carritoRouterf);

server.get("/", (req, res, siguiente) => {
  res.send("Home");
});

server.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/faillogin" }),
  postSignup
);

server.get("/login", checkAuthentication, (req, res) => {
  var user = req.user;
  console.log(user);
  res.send("Mostrando info de usuario");
});
server.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }),
  postLogin
);

server.get("/faillogin", failLogin);

server.get("/signup", (req, res, siguiente) => {
  res.send("Pagina de Registro");
});
server.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignnup" }),
  postSignup
);
server.get("/failsignup", failSignup);

server.get("/logout", (req, res, siguiente) => {
  req.logout();
  res.send("loggedOut");
});

server.get("/carrito", checkAuthentication, (req, res) => {
  const findUser = async () => {
    try {
      const user = await contenedorUsers.getUser(req.user[0].username);
      console.log(user[0].cart);
      res.send("ITEMS EN EL CARRO" + JSON.stringify(user[0].cart, null, "\t"));
    } catch (error) {
      console.log(error);
    }
  };
  findUser();
});

server.post("/carrito", checkAuthentication, (req, res) => {
  const findUser = async () => {
    try {
      const info = {
        user: req.user[0].username,
        product: req.body,
      };
      await contenedorUsers.saveProduct(info);
      res.send("Se han Añadido los objetos al carro");
    } catch (error) {
      console.log(error);
    }
  };
  findUser();
});
server.post("/hacerOrden", checkAuthentication, (req, res) => {
  const findUser = async () => {
    try {
      const user = await contenedorUsers.getUser(req.user[0].username);
      const info = {
        user: user[0].username,
        orden: user[0].cart
      };
      newOrderNodeMailer(info);
      console.log(info)
      res.send("Se ha Hecho su orden");
    } catch (error) {
      console.log(error);
    }
  };
  findUser();
});
server.get("*", (req, res) => {
  res.send("Ruta no Implementada");
});
server.listen(PORT, () => {
  console.log(`Servidor En el puerto # ${PORT}`);
});
