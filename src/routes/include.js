"use strict";
const router = require('express').Router();
const { classModel } = require('../models/index.js');
const { courseModel } = require('../models/index.js');
const { studentModel } = require('../models/index.js');
const { teacherModel } = require('../models/index.js');
const { userModel } = require('../models/index.js');

router.get('/classes-teacher', getAllClassTeacher);
router.get('/course-classes', getCourseClasses);


async function getAllClassTeacher(req, res) {
    try {
        let teacher = await teacherModel.findAll({ include: [classModel] })

        res.json(teacher);

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

module.exports = router;







