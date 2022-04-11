'use strict';
const router = require('express').Router();
const { studentModel } = require('../models/index');

router.post('/addstudent', async (req, res) => {
    let { firstName, lastName,gender,nationality,major} = req.body;
    let newStudent = await studentModel.create({
        firstName: firstName,
        lastName: lastName,
        gender : gender,
        nationality : nationality,
        major : major,
    });
    res.status(201).json({
        "added student succesfully with the following info": newStudent,
    });
});



router.get('/allstudents', async (req, res) => {
    let students = await studentModel.findAll();
    res.status(200).json({
        students: students
    });

})


router.get('/student/:id', async (req, res) => {
    let student = await studentModel.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        student: student
    });

})

router.put('/student/:id', async (req, res) => {
    let student = await studentModel.findOne({
        where: {
            id: req.params.id
        }
    });
    let updatedStudent = await student.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    
    })
    res.status(200).json({
        'updated student succesfully with the following info': updatedStudent,
    });
})
router.delete('/student/:id', async (req, res) => {
    let student = await studentModel.findOne({
        where: {
            id: req.params.id
        }
    });
    let deletedStudent = await student.destroy();
    res.status(200).json({
        'deleted student succesfully with the following info': deletedStudent,
    });
})



module.exports = router;