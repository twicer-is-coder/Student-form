const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);

const RoomsRoutes = require('./routes/rooms');
const UsersRoutes = require('./routes/users');

const { Initialize_Socket_IO } = require('./user_modules/socket-io');
const { Initialize_Mongo_DB } = require('./db/db')
const PORT = process.env.PORT || 3030;

Initialize_Socket_IO(server);
Initialize_Mongo_DB();

app.use(cors());
app.use('/api/room', RoomsRoutes);
app.use('/api/user', UsersRoutes);

app.all('*', (req, res) => {
    res.status(404).send('Invalid Endpoint!')
})

server.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', `Server Started on: ${PORT}`);
});