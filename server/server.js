const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App!'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('disconnect', (socket) => {
    console.log("User disconnected");
    });
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude ,coords.longitude));
    });
});


server.listen(port, () => {
    console.log("Server is up and running on port " + port);
})