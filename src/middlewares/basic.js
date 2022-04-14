"use strict";
require('dotenv').config();
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || "something";
const { userModel } = require('../models/index');
const bcrypt = require('bcrypt');


const basicAuth = async (req, res, next) => {
    let basicAuthText = req.headers.authorization;
    try {
        if (basicAuthText) {
            let basicHeardersParts = basicAuthText.split(' ');
            let encoded = basicHeardersParts.pop();
            let decode = base64.decode(encoded);
            let [userName, password] = decode.split(":")
            const User = await userModel.findOne({ where: { userName: userName } });
            const valid = await bcrypt.compare(password, User.password);
            if (valid) {
                let newToken = jwt.sign({userName:User.userName},SECRET,{expiresIn : '365d'});
                User.token = newToken;
                req.User = User
                next()
            } else {
                res.status(403).send('invalid sign in Password')
            }
        }

    } catch (error) {
        console.error(`${error}`)
        res.status(403).send('invalid sign in UserName')
    }
}

module.exports = basicAuth;