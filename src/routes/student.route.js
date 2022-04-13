'use strict';
const router = require('express').Router();
const { studentModel } = require('../models/index');
const { classModel } = require('../models/index');
const bearer = require('../middlewares/bearer');



router.get('/allstudents',bearer, async (req, res) => {
    let students = await studentModel.findAll();
    res.status(200).json({
        students: students
    });

})


router.get('/student/:id',bearer, async (req, res) => {
    let student = await studentModel.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        student: student
    });

})

router.put('/student/:id',bearer, async (req, res) => {
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
router.delete('/student/:id',bearer,async (req, res) => {
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

router.post('/choose-class/:id', async (req, res)=>{

    let currentStudent = await studentModel.findOne ({
        where: {
            id : req.params.id
        }
    })

    let toAddClass = await classModel.findOne ({
        where: {
            id : req.body.chosenClass
        }
    })

    await currentStudent.addClass(toAddClass); // this is a special method in belongstomany
    let myresponse = await currentStudent.getClasses();
    // console.log(myresponse[0].student_class);
    res.send( myresponse[0].student_class) // grab all my classes
// for 1 student to add classes, this will get me all the classes student has
})


module.exports = router;