"use strict";
const express = require("express");
const { classModel, courseModel, studentModel, teacherModel,student_classModel } = require("../models/index");
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
  let classId = req.params.id;
  let classes = await classModel.findOne({ where: { id: classId } });
  res.status(200).json(classes);
}

async function updateClass(req, res) {
  let {className,courseName,userName,classTime} = req.body;
  let id = req.params.id;
  const classes = await classModel.findOne({ where: { id: id } });
  const updatedClass = await classes.update({
    className : className,
    courseName : courseName,
    userName : userName,
    classTime : classTime
  });
  res.status(201).json({"class": updatedClass});
}

async function deleteClass(req, res) {
  let removedId = req.params.id;
  let removedClass = await classModel.destroy({ where: { id: removedId } });
  res.status(200).send(`class ${removedClass} was deleted successfully`);
}

// for admin to add students, 
// but please don't add a student if they already joined the class using their route /choose-class/:id
router.post("/add-students-toClass",bearer,acl('delete'), async (req, res) => {
  const  {className,userName,studentGrade} = req.body;
  let currentClass = await classModel.findOne({
    where: {
      className: className,
    },
  });

  let toAddStudent = await studentModel.findOne({
    where: {
      userName: userName,
    },
  });

  await currentClass.addStudent(toAddStudent,{through:{studentGrade:studentGrade}}); // this is a special method in belongstomany
  console.log('1111111111',toAddStudent)
  res
    .status(201)
    .json({
      "Message":`student ${toAddStudent.firstName} added to class ${currentClass.className}`,
      "studentName": toAddStudent.firstName ,"className":currentClass.className ,"studentGrade":studentGrade
    }
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
    return {
      "studentName":`${ele.dataValues.firstName} ${ele.dataValues.lastName}`,
      "studentGrade":ele.dataValues.student_class.studentGrade,
  }
  }); // print all students
  console.log(allStudents)
  console.log(myresponse)
  res.json({
   "className": currentClass.className,
   "students": allStudents
});
});

router.patch("/edit-grade-for-student-in-class/:id", async (req, res) => { //classId - studentId

  const {studentGrade} = req.body

  let record = await student_classModel.findOne({
    where: {
      // classId: req.params.id,
      studentId : req.params.id
    },
  });
  console.log(111111111111111111111111,record.dataValues.studentGrade)
  record.dataValues.studentGrade=studentGrade
  console.log(222222222222222222222222222,record.dataValues.studentGrade)

  let updated = await record.update({
    studentGrade:studentGrade
  });


  res.json({
   updated
});
});

module.exports = router;
