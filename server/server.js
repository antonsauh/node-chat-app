const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

var app = express();
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 3000;

io.on('connection', (socket)=> {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App!'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    });


    socket.on('disconnect', () => {
        console.log("user disconnected");
        var user = users.removeUser(socket.id)[0];
        if(user) {
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        }
    });
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        callback();
    });
    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude ,coords.longitude));
    });
});


server.listen(port, () => {
    console.log("Server is up and running on port " + port);
})