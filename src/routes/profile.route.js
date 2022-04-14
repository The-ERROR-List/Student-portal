"use strict";

const { userModel } = require("../models/index");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

router.patch("/profile-update-password/:id", async (req, res) => {
let {email} = req.body;
const user = await email.filter(async (email) => {
  const user = await userModel.findOne({ where: { email: email } });
  if(user){
    await user.update({ password: await bcrypt.hash(req.body.password, 5) });
    console.log("before", user.password);
    console.log("after", user.password);
    res.status(201).send("password is updated successfully");

  }else{
    res.status(404).send("email not found");
  }
 
})
})


module.exports = router;
