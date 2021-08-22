const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./user');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(router)

const server = http.createServer(app);
const io = socketio(server, { cors:{origin: "*"}});
let avtaris;
io.on('connection', (socket)=>{
    console.log("We have a new connection!!");
    socket.on('userData', ({username, room, avtar})=>{
        socket.data.room = room;
        socket.data.username = username;
        avtaris = avtar;
        socket.join(room);
        console.log(username);
    })

    socket.on('sendMessage', async (message, callback)=>{
        const date = new Date()
        io.to(socket.data.room).emit('message', { user: socket.data.username, text:message, time: date.getHours() + ':' + date.getMinutes(), avtar: avtaris  });
        callback();
    })

})

server.listen(PORT, ()=>console.log(`server has started on port ${PORT}`))