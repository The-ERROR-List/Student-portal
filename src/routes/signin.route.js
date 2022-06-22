'use strict'
const basicAuth = require('../middlewares/basic');
const {userModel} = require('../models/index.js') // import the user model

const router = require('express').Router();

router.post('/signin', basicAuth, (req, res) => {
    res.status(200).json({
        "userInfo":req.User,
        "newId":req.User.newId
    });
});
module.exports = router;

