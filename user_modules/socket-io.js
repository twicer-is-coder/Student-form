
module.exports.Initialize_Socket_IO = (server) => {
    
    const io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    
    const SocketEvent = {
        "CONNECTION": "connection",
        "DISCONNECT": "disconnect",
        "CHAT_MESSAGE": "Chat Message",
        "NEW_USER": "New User",
        "CONNECT": "connect",
        "DISCONNECT": "disconnect"
    }
    
    io.on(SocketEvent.CONNECTION, (socket) => {
    
        console.log('A User Connected');
        socket.broadcast.emit(SocketEvent.NEW_USER);
    
        // socket.on('join-room', (roomId, userId) => {
        //     socket.join(roomId);
        //     socket.to(roomId).broadcast.emit('user-connected', userId);
        // });
    
        socket.on(SocketEvent.DISCONNECT, () => {
            console.log('A User Disconnected');
        });
    
        socket.on(SocketEvent.CHAT_MESSAGE, (Message) => {
            // io.emit('LatestMessage', msg);
            console.log("Message", Message);
            socket.broadcast.emit('Chat Message', { "Message": Message });
        });
    
    });

}