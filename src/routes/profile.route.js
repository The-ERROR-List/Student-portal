"use strict";

const { userModel } = require("../models/index");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.patch("/profile-update-password/:id", async (req, res) => {
  const user = await userModel.findOne({ where: { id: req.params.id } });
  console.log("before", user.password);
  await user.update({ password: await bcrypt.hash(req.body.password, 5) });
  console.log("after", user.password);
  res.status(201).send("password is updated successfully");
});

module.exports = router;
