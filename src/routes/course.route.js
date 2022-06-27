'use strict';

const express = require('express');
const {courseModel} = require('../models/index');
const {teacherModel} = require ('../models/index');
const {classModel} = require ('../models/index');
const router = express.Router();
const bearer = require('../middlewares/bearer');
const acl = require('../middlewares/acl');



router.post('/courses',bearer,acl('delete'),addCourse);
router.get('/courses',bearer,getAllcourses);
router.get('/courses/:id',bearer,getOneCourse);
router.put('/courses/:id',bearer,acl('update'),updateCourse);
router.delete('/courses/:id',bearer,acl('delete'),deleteCourse);




async function addCourse(req, res){
    let body = req.body;
    let addedCourse = await courseModel.create(body);

    res.status(201).json({'new course was added succesfully': addedCourse});

}



async function getAllcourses(req,res){
    let courses = await courseModel.findAll();
    res.status(200).json(courses);
}




async function getOneCourse(req, res){
    let courseId = req.params.id;
    let courses = await courseModel.findOne({where :{id: courseId}});
    res.status(200).json(courses);
}

async function updateCourse(req, res){
let {
    courseName,courseGrade,courseDescription,courseImg
} = req.body;
let id = req.params.id;
const courses = await courseModel.findOne({where :{id: id}});
const updatedCourse = await courses.update({
    courseName:courseName,
    courseGrade:courseGrade,
    courseDescription:courseDescription,
    courseImg:courseImg,
});
res.status(201).send({"course was updated successfully": updatedCourse});
}

async function deleteCourse(req, res){
let removedId = req.params.id;
let removedCourse = await courseModel.destroy({where : {id: removedId}})
res.status(204).json({"course was deleted successfully": removedCourse});
}

// for admin to see all the teachers that teach a specific course
router.get('/all-teachers-for-course/:courseId',bearer,async(req, res)=>{

    let course = await courseModel.findOne({
        where : {id : req.params.courseId} // find the course all the teachers that teach this course
    });
 
    let response = await course.getTeachers();

   let allTeachers= response.map(teacher => {

    return {
        "TeacherName":`${teacher.dataValues.firstName} ${teacher.dataValues.lastName}`
    } 

    })

    res.json({"courseName":course.courseName, TeacherName:allTeachers })

})

router.get('/allcourses-and-their-classes',bearer,async(req, res)=>{
    let courses = await courseModel.findAll({
        include : [classModel] // all the classes for this course
    });
    console.log(courses);
    res.status(200).json({
        courses: courses
    });
})

module.exports = router;