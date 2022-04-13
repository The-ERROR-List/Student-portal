"use strict";
const router = require('express').Router();
const { classModel } = require('../models/index.js');
const { courseModel } = require('../models/index.js');
const { studentModel } = require('../models/index.js');
const { teacherModel } = require('../models/index.js');
const { userModel } = require('../models/index.js');
const bearer = require('../middlewares/bearer');
router.get('/course-teacher',bearer, getAllCourseTeacher);
router.get('/user-student',bearer,getStudentUser);
router.get('/user-teacher',bearer,getTeacherUser);
router.get('/course-classes',bearer,getCourseClasses);
// router.get('/teacher-classes', getTeacherClasses);
// router.get('/student-classes', getStudentClasses);

async function getAllCourseTeacher(req, res) {
    try {
        let course = await courseModel.findAll({ include: [teacherModel] })

        res.json(course);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async  function getCourseClasses(req, res) {
    try {
        let course = await courseModel.findAll({ include: [classModel] })

        res.json(course);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// async function getStudentUser(req, res) {
//     try {
//         let UserModel = await studentModel.findAll({ include: [userModel] })
//         res.json(student);
async function getStudentUser(req, res) {
    try {
        let student = await studentModel.findAll({ include: [userModel] })
        res.json(student);
    }
catch(err) {
    res.status(500).json({ message: err.message });
}
}
async function getTeacherUser(req, res) {
    try {
        let teacher = await teacherModel.findAll({ include: [userModel] })
        res.json(teacher);
    }catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;








