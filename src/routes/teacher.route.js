'use strict';
const router = require('express').Router();
const { teacherModel } = require('../models/index');


router.post('/addteacher', async (req, res) => {
    let { firstName, lastName,gender,nationality,department} = req.body;
    let newTeacher = await teacherModel.create({
        firstName: firstName,
        lastName: lastName,
        gender : gender,
        nationality : nationality,
        department : department,
    });
    res.status(201).json({
        "added teacher succesfully with the following info": newTeacher,
    });
})

router.get('/allteachers',async()=>{
    let teachers = await teacherModel.findAll();
    res.status(200).json({
        teachers: teachers
    });
})
router.get('/teacher/:id', async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        teacher: teacher
    });

})
router.put('/teacher/:id', async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    });
    let updatedTeacher = await teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    
    })
    res.status(200).json({
        'updated teacher succesfully with the following info': updatedTeacher,
    });
})
router.delete('/teacher/:id', async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    });
    let deletedTeacher = await teacher.destroy();
    res.status(200).json({
        'deleted teacher succesfully with the following info': deletedTeacher,
    });
})