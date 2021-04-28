const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3030;

io.on('connection', (socket) => {
   
    console.log('A User Connected');
    socket.broadcast.emit("New User");

    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
    });
  
    socket.on('disconnect', () => {
        console.log('A User Disconnected');
    });

    socket.on('VideoPlayPause', function(pause){
        socket.broadcast.emit('RecieveVid',pause);
    });

    socket.on('BarTimeUpdate', function(Time){
        socket.broadcast.emit('BarTimeUpdate',Time);
    });

    socket.on('Chat Message', (Message) => {
      // io.emit('LatestMessage', msg);
      console.log("Message",Message);
      socket.broadcast.emit('Chat Message', {"Message":Message});
    });

});

server.listen(PORT, () => {
  console.log(`Server Started on: ${PORT}`);
});