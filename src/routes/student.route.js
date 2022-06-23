"use strict";
const router = require("express").Router();
const { studentModel } = require("../models/index");
const { classModel } = require("../models/index");
const bearer = require("../middlewares/bearer");
const acl = require("../middlewares/acl");

router.get("/allstudents", bearer, async (req, res) => {
  let students = await studentModel.findAll();
  res.status(200).json({
    students: students,
  });
});

router.get("/student/:id", bearer, async (req, res) => {
  let student = await studentModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    student: student,
  });
});

router.put("/student/:id", bearer, acl("update"), async (req, res) => {
  let student = await studentModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  let updatedStudent = await student.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  res.status(200).json({
    "updated student succesfully with the following info": updatedStudent,
  });
});
router.delete("/student/:id", bearer, acl("delete"), async (req, res) => {
  let student = await studentModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  let deletedStudent = await student.destroy();
  res.status(200).json({
    "deleted student succesfully with the following info": deletedStudent,
  });
});

// for students to choose a class
router.post("/choose-class/:id", bearer, acl("delete"), async (req, res) => {
  let currentStudent = await studentModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  let toAddClass = await classModel.findOne({
    where: {
      id: req.body.chosenClass,
    },
  });

  await currentStudent.addClass(toAddClass); // this is a special method in belongstomany adding class to one student

  res.send(
    `${toAddClass.className} has been added to ${currentStudent.firstName}`
  );
});

// for students to get all the classes they have
router.get("/get-classes-for-student/:id", bearer, async (req, res) => {
  let currentStudent = await studentModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  let response = await currentStudent.getClasses();

  let allClasses = response.map((element) => {
    return { "className": element.dataValues.className ,"classId":element.dataValues.id}
  });
  // get all classes the student has
  res.json({
    "studentName": `${currentStudent.firstName}  ${currentStudent.lastName}`,
    "classes": allClasses
  });
}
);

module.exports = router;
