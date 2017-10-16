const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket)=> {
    console.log('New user connected');
    socket.on('disconnect', (socket) => {
    console.log("User disconnected");
    });
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        });
    });
});


server.listen(port, () => {
    console.log("Server is up and running on port " + port);
})