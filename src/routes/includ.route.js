"use strict";
const router = require('express').Router();
const { classModel } = require('../models/index.js');
const { courseModel } = require('../models/index.js');
const { studentModel } = require('../models/index.js');
const { teacherModel } = require('../models/index.js');
const { userModel } = require('../models/index.js');

router.get('/course-teacher', getAllCourseTeacher);
router.get('/user-student', getStudentUser);
router.get('/course-classes', getCourseClasses);
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


module.exports = router;








