const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { faker } = require("@faker-js/faker");

const  ProductosRepo = require ("./repositories/ProductosRepo");
const repo = new ProductosRepo();

const app = express();
const server = http.createServer(app);
const io = new Server(server);


//GRAPHQL 
const graphqlHTTP  = require("express-graphql").graphqlHTTP()
const buildSchema = require("graphql").buildSchema()

const {Producto,schema,getProductos,updateProducto, addProducto, deleteProducto} = require("./controllers/graphqlController")


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



// app.use(express.static(__dirname + '/public'));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: {
      getProductos,
      addProducto,
      deleteProducto,
      updateProducto,
  },
  graphiql: true,
}));


server.listen(3000, () => {
  console.log("listening on PORT:3000");
});

server.on("error", (error) => console.log(`Server error: ${error}`));