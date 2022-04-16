"use strict";
const { userModel } = require("../models/index");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const sendMail = require('../functions/reset.pwd')
router.get("/reset-password/emailcheck",async (req, res,next) => {
  let {email} = req.body;
  const user = await userModel.findOne({ where: { email: email } });
  if(user){
    sendMail(email)
    res.status(200).json({
      message: "Email sent"
    });
  }else{
    res.status(404).send("email not found");
  }
});



router.get("/reset-password/newpassword", async (req, res) => {

  let {email,password} = req.body; 
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  const user = await userModel.update({ password: hash }, { where: { email: req.body.email } });
  res.status(200).send(`password updated successfully for user : ${email}`);
  
});



module.exports = router;
