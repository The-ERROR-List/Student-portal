'use strict';
const router = require('express').Router();
const { teacherModel } = require('../models/index');
const {courseModel} = require ('../models/index');
const bearer = require('../middlewares/bearer');
const acl = require('../middlewares/acl');



router.get('/allteachers',bearer,async(req,res)=>{

    let teachers = await teacherModel.findAll();
    res.status(200).json({
        teachers: teachers
    });
})

router.get('/teacher/:id',bearer,async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        teacher: teacher
    });

})
router.put('/teacher/:id',bearer,acl('delete'),async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    }); 
    
    let updatedTeacher = await teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        courseId : req.body.courseId,
    
    })
    res.status(200).json({
        'updated teacher succesfully with the following info': updatedTeacher,
    });
})
router.delete('/teacher/:id',bearer,acl('delete'),async (req, res) => {
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

router.post("/add-course-toTeacher/:id", async (req, res) => {
    let teacher = await teacherModel.findOne({
      where: {
        id: req.params.id,
      },
    });
  
    let addCourses = await courseModel.findOne({
      where: {
        id: req.body.chosenCourse,
      },
    });
  
    await teacher.addCourse(addCourses);
    res
      .status(201)
      .send(
        `Teacher ${teacher.firstName} added ${addCourses.courseName} successfully to their courses`
      );
  });
  
  
  router.get("/get-allCourses-for-teacher/:id", async (req, res) => {
  
    let teacher = await teacherModel.findOne({
        where: {
          id: req.params.id,
        },
      });
  
    let response = await teacher.getCourses();
  
    let allCourses = response.map((element) => {
    
      return element.teacher_course.dataValues.courseId;
    });
    
    res.send(`${teacher.firstName} has: ${allCourses}`);
  });


module.exports = router;