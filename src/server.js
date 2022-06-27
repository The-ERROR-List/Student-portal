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
const announcement = require('./routes/announcement.route')
const include = require('./routes/include');



const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
      origin: ["http://localhost:3001/"] // the client port in react
    },
  });

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
app.use(announcement)


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
// app.get('/socketMessages', (req, res) => {
//     res.sendFile(__dirname + '/socket-messages/index.html');
// }); we used to use this to serve the client frontend on the express server

const whiteBoard = io.of('/whiteboard');
whiteBoard.on('connection', onConnection);


//----------------- 

const socketMessages = io.of('/socketMessages'); //namespace

socketMessages.on('connection', (socket) => { // socket is sent when react client connects
    console.log('socket client connected', socket.id);


    socket.on("join_room", (data) => {
        socket.join(data); // data is room
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

    socket.on('send_message', (data) => {
        // console.log(data)
        // if (room === '') {
        //     socket.broadcast.emit('recieved-message',message,user); if the room wasn't specified
    
        socket.to(data.room).emit('receive_message', data);
       
    })

    socket.on ('disconnect', ()=>{
        console.log('user disconnected', socket.id);
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