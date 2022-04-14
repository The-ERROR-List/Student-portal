//stu

const express = require("express");
const { userModel } = require("../models/index");
const { studentModel } = require("../models/index");
const { teacherModel } = require("../models/index");
const bcrypt = require("bcrypt");
const bearer = require("../middlewares/bearer");
const acl = require("../middlewares/acl");
const sendmail = require("../functions/sendmail");

const router = express.Router();

router.post("/signup/admin", async (req, res) => {
  
  let { userName, email, password } = req.body;
  let hashed = await bcrypt.hash(password, 5);
  console.log("hashed", hashed);
  let newUser = await userModel.create({
    userName: userName,
    email: email,
    password: hashed,
    role: 'admin'
  }); 

  if (newUser.role == "admin"){
    res.status(201).json ({"added admin succesfully with the following info": newUser})
  }

  sendmail(userName, userName, password, email);

});

router.post("/signup/std-teacher",bearer,acl('delete'), async (req, res) => {
  console.log(req.body);
  let { userName, email, password, role } = req.body;
  let hashed = await bcrypt.hash(password, 5);
  console.log("hashed", hashed);
  let newUser = await userModel.create({
    userName: userName,
    email: email,
    password: hashed,
    role: role,
  }); 

  if (newUser.role == "admin"){
    res.status(201).json ({"added admin succesfully with the following info": newUser})
  }

  if (newUser.role == "student") {
    let { firstName, lastName, gender, nationality, major } = req.body;

    let newStudent = await studentModel.create({
      userId: newUser.id,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      nationality: nationality,
      major: major,
    });
    sendmail(firstName, userName, password, email);
    res.status(201).json({
      "added student succesfully with the following info": newStudent,
    });
  } else if (newUser.role == "teacher") {
    let { firstName, lastName, gender, nationality, department } = req.body;

    let newTeacher = await teacherModel.create({
      userId: newUser.id,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      nationality: nationality,
      department: department,
    });
    sendmail(firstName, userName, password, email);

    res.status(201).json({
      "added teacher succesfully with the following info": newTeacher,
    });

  }

});

module.exports = router;
