'use strict';
const cors = require('cors');
require('dotenv').config();
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const signup = require ('./routes/signup.route');
const signin = require('./routes/signin.route');

const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());
app.use(signup);
app.use(signin);


// socket.io server setup 
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
app.get('/', (req, res) => {
    res.status(200).send('Home Route!');
});



app.use(errorHandler);
app.use('*', notFoundHandler);

function start(port) {
    app.listen(port, () => {
        console.log(`running on port ${port}`)
    })
}

module.exports = {
    app: app,
    start: start
}