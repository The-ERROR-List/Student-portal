'use strict';
const cors = require('cors');
require('dotenv').config();

const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const signup = require('./routes/signup.route');
const classRoute = require('./routes/class.route');
const courseRoute = require('./routes/course.route');
const signin = require('./routes/signin.route');
const student = require('./routes/student.route');
const teacher = require('./routes/teacher.route');
const profile = require('./routes/profile.route');
// const signout = require('./routes/signout.route');
const zoom = require('./routes/zoom.route');
const content = require('./routes/content.route');




const express = require('express');
const req = require('express/lib/request');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(cors());
app.use(signup);
app.use(signin);
app.use(student);
app.use(teacher);
app.use(courseRoute);
app.use(classRoute);
app.use(profile);
app.use(zoom);
app.use(content);


app.use(include);



app.get('/', (req, res) => {
    res.status(200).send('Home Route!');
});

// socket.io server setup 

app.use(express.static(__dirname + '/whiteboard'));
app.use(express.static(__dirname + '/socket-messages'));

function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}
app.get("/whiteboard", (req, res) => {
    res.sendFile(__dirname + '/whiteboard/index.html');
})
app.get('/socketMessages', (req, res) => {
    res.sendFile(__dirname + '/socket-messages/index.html');
});

const whiteBoard = io.of('/whiteboard');
whiteBoard.on('connection', onConnection);

const socketMessages = io.of('/socketMessages');
socketMessages.on('connect', (socket) => {
    socket.on('send-message', (message,user,room) => {
        if (room === '') {
            socket.broadcast.emit('recieved-message',message,user);
    
        }else{
            socket.to(room).emit('recieved-message',message,user);
        }
    })
    
    socket.on('join-user',(user,joinedMessageCb) =>{
            socket.join(user);
            joinedMessageCb(`Joined ${user}`);
    })
    socket.on('join',(room,joinedMessageCb)=>{
        socket.join(room)
        joinedMessageCb(`Joined ${room} room`)
    })

});





app.use(errorHandler);
app.use('*', notFoundHandler);

function start(port) {
    http.listen(port, () => {
        console.log(`running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start
}