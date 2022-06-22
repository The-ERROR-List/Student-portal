"use strict";
require('dotenv').config();
const base64 = require('base-64');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || "something";
const { userModel, studentModel ,teacherModel} = require('../models/index');
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
            let teacher;
            if(User.role ==='teacher'){
                // console.log('1111',User);
                 teacher = await teacherModel.findOne({where:{userName:User.userName}}) 
            }
            let student;
            if(User.role ==='student'){
                // console.log('1111',User);
                student = await studentModel.findOne({where:{userName:User.userName}}) 
            }
            // console.log('222',teacher);

            const valid = await bcrypt.compare(password, User.password);
            if (valid) {
                let newToken = jwt.sign({userName:User.userName},SECRET,{expiresIn : '365d'});
                User.token = newToken;
                console.log('3333',User.role);

                if(User.role === "teacher") {
                //   console.log('444',User);
                    User['newId'] = teacher.id
                }
                if(User.role === "student") {
                    // console.log('444',User);
                      User['newId'] = student.id
                  }

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