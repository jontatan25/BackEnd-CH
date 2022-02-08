const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("./public"));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on("connection", (socket) => {
  console.log("usuario conectado");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.emit("mi mensaje", "este es un mensaje desde el servidor");
  socket.on("mensaje", (data) => {
    mensajes.push({ socketid: socket.id, mensaje: data });
    io.sockets.emit("mensajes", mensajes);
  });
});
