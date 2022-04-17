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
const include = require('./routes/include.js');
const zoom = require('./routes/zoom.route');

const express = require('express');
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
app.use(include);
app.use(zoom);

// socket.io server setup 

app.use(express.static(__dirname + '/whiteboard'));

function onConnection(socket){
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}
app.get("/whiteboard", (req, res) => {
    res.sendFile(__dirname + '/whiteboard/index.html');
})
const whiteBoard = io.of('/whiteboard');
whiteBoard.on('connection', onConnection);


app.get('/', (req, res) => {
    res.status(200).send('Home Route!');
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