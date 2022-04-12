"use strict";
const router = require('express').Router();
const {classModel} = require('../models/index.js');
const {courseModel} = require('../models/index.js');
const {studentModel} = require('../models/index.js');
const {teacherModel} = require('../models/index.js');
const {userModel} = require('../models/index.js');

router.get('/course-teacher', getCourseTeacher);
// router.get('/course-student', getCourseStudent);
router.get('/course-classes', getCourseClasses);
// router.get('/teacher-classes', getTeacherClasses);
// router.get('/student-classes', getStudentClasses);

async function getCourseTeacher (req,res){
    let course
}





module.exports=router;








