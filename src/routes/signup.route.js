//stu

const express = require("express");
const { userModel } = require("../models/index");
const { studentModel } = require("../models/index");
const { teacherModel } = require("../models/index");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  let { userName, email, password, role } = req.body;
  let hashed = await bcrypt.hash(password, 5);
<<<<<<< HEAD
  console.log("hssssssssssssss", hashed);
=======
  console.log("hashed", hashed);
>>>>>>> ed7306f88d74ba72638219108be352d5b792305c
  let newUser = await userModel.create({
    userName: userName,
    email: email,
    password: hashed,
    role: role,
  }); 

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
    res.status(201).json({
      "added teacher succesfully with the following info": newTeacher,
    });
  }
});

module.exports = router;
