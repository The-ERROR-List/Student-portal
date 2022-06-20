"use strict";
const { userModel } = require("../models/index");
const JWT = require("jsonwebtoken");
require('dotenv').config();
const SECRET = process.env.SECRET || "something";

const bearerAuth = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      let bearerToken = req.headers.authorization.split(" ");
      let token = bearerToken.pop();
      if (token) {
        const userToken = JWT.verify(token, SECRET);
        const User = await userModel.findOne({
          where: { userName: userToken.userName },
        });

        if (User) {
          req.token = userToken;
          req.User = User;
          next();
        } else {
          res.status(401).send("Unauthorized user");
        }
      }
    } catch (error) {
      res.status(401).send("Unauthorized Token");
    }
  } else {
    res.status(403).send("Empty Token");
  }
};

module.exports = bearerAuth;

