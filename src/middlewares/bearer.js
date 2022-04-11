'use strict';
const {userModel}=require('../models/index');
const JWT = require('jsonwebtoken');
const SECRET = process.env.SECRET || "i hate waking up early";

const bearerAuth = async (req,res,next)=>{
  if (req.headers.authorization) {
      try {
    let bearerToken = req.headers.authorization.split(' ');
    let token = bearerToken.pop();

    if (token) {
        
        const userToken = JWT.verify(token,SECRET);
console.log(userToken.userName,'+++++');
        const User = await userModel.findOne({where:{userName : userToken.userName}});

        if (User) {
            req.token = userToken;
            req.User = User;
            next();
            } else {
               res.status(401).send('Unauthorized user')
            } 
      } }catch (error) {
        res.status(401).send('Unauthorized Token');
      }
}else{
    res.status(404).send('Empty Token')
}}

module.exports = bearerAuth;