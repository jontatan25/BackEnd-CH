const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const msgs= []

app.use(express.static("./public"));
app.get('/', (req, res) => {
  res.sendFile('/index.html',{root:__dirname})
});

io.on('connection', (socket) => {
    console.log('a user connected');
    // send chat to the user that just connected
    socket.emit('chat message',msgs)
    // listening and sending mssgs to all users
    socket.on('chat message', (msg) => {
        msgs.push({socketId:socket.id,userMsg:msg});
        console.log(msgs);
        io.sockets.emit('chat message', msgs);
      });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});

server.on('error',error => console.log(`Server error: ${error}`))