//stu

const express = require("express");
const { userModel } = require("../models/index");
const { studentModel } = require("../models/index");
const { teacherModel } = require("../models/index");

const router = express.Router();

router.post("/signup", async (req, res) => {
  console.log(req.body);
  let { userName, email, password, role } = req.body;
  let newUser = await userModel.create({
    userName: userName,
    email: email,
    password: password,
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
