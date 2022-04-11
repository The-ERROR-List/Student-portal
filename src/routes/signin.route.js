'use strict'
const basicAuth = require('../middlewares/basic');
const {userModel} = require('../models/index.js') // import the user model

const router = require('express').Router();

router.post('/signin', basicAuth, (req, res) => {
    userModel.findOne({
        where: {
            userName: req.body.userName,
            password: req.body.password
        }
    }).then(user => {
        if (user) {
            res.statu(201).json({
                success: true,
                message: 'Authentication successful!',
                user: user
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Authentication failed!'
            });
        }
    });
});
module.exports = router;

