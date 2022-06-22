"use strict";
const express = require("express");
const { classModel, courseModel, studentModel, teacherModel } = require("../models/index");
const router = express.Router();

const bearer = require('../middlewares/bearer');
const acl = require('../middlewares/acl')

router.get('/classes',bearer,getAllClasses);
router.post('/classes',bearer,acl('delete'),addClass);
router.get('/classes/:id',bearer,getOneClass);
router.put('/classes/:id',bearer,acl('update'),updateClass);
router.delete('/classes/:id',bearer,acl('delete'),deleteClass);

async function getAllClasses(req, res) {
  let classes = await classModel.findAll();
  res.status(200).json(classes);
}

async function addClass(req, res) {
  let {className,courseName,userName,classTime} = req.body;
  let teacher = await teacherModel.findOne({where : {userName : userName}})
  let course = await courseModel.findOne({where :{courseName : courseName}})
  let addedClass = await classModel.create({
    className ,
    teacherId : teacher.id,
    courseId : course.id,
    teacherName:`${teacher.firstName} ${teacher.lastName}`,
    courseName : course.courseName,
    classTime : classTime

  });
 
  res.status(201).json({ "new class was added succesfully": addedClass }); // you have to send courseId and teacherId in req.body
} // to create the class inside a specific course

async function getOneClass(req, res) {
  let classId = parseInt(req.params.id);
  let classes = await classModel.findOne({ where: { id: classId } });
  res.status(200).json(classes);
}

async function updateClass(req, res) {
  let body = req.body;
  let id = req.params.id;
  const classes = classModel.findOne({ where: { id: id } });
  const updatedClass = await classModel.update(body);
  res.status(201).send(`class ${updatedClass} was updated successfully`);
}

async function deleteClass(req, res) {
  let removedId = req.params.id;
  let removedClass = await classModel.destroy({ where: { id: removedId } });
  res.status(200).send(`class ${removedClass} was deleted successfully`);
}

// for admin to add students, 
// but please don't add a student if they already joined the class using their route /choose-class/:id
router.post("/add-students-toClass/:id",bearer,acl('delete'), async (req, res) => {
  // let body = {className,userName,stuedntGrade}
  let currentClass = await classModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  let toAddStudent = await studentModel.findOne({
    where: {
      id: req.body.chosenStudent
    },
  });

  await currentClass.addStudent(toAddStudent); // this is a special method in belongstomany
  res
    .status(201)
    .send(
      `student ${toAddStudent.firstName} added successfully in ${currentClass.className}`
    );
});
// this will get me all the students in a specific class
router.get("/get-allStudents-inClass/:id", async (req, res) => {

  let currentClass = await classModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  let myresponse = await currentClass.getStudents();
  let allStudents = myresponse.map((ele) => {
    return `${ele.dataValues.firstName} ${ele.dataValues.lastName}`
  }); // print all students
  
  res.send(`${currentClass.className} has: ${allStudents}`);
});

module.exports = router;
